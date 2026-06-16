package com.example.onBoardingNew.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.onBoardingNew.model.USerModel;
import com.example.onBoardingNew.repository.UserRepository;
import com.example.onBoardingNew.util.JwtUtil;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtUtil jwtUtil;

	@Value("${aws.accessKeyId}")
	private String awsAccessKey;

	@Value("${aws.secretKey}")
	private String awsSecretKey;

	@Value("${aws.region}")
	private String awsRegion;

	@Value("${aws.s3.bucket}")
	private String awsBucket;

	public String registerUser(USerModel userModel) {
		System.out.println("registerUser service called");
		String hashedPassword = passwordEncoder.encode(userModel.getPassword());
		userModel.setPassword(hashedPassword);
		userRepository.save(userModel);
		return "User registered successfully";
	}

	public String findUser(USerModel userModel) {
		Optional<USerModel> userData = userRepository.findByUsername(userModel.getUsername());
		if (userData.isPresent()) {
			System.out.println("The user data is present");
			USerModel existingUser = userData.get();
			if (passwordEncoder.matches(userModel.getPassword(), existingUser.getPassword())) {
				String token = jwtUtil.generateToken(existingUser.getUsername());
				System.out.println("Password correct");
				return token;
			} else {
				System.out.println("Password incorrect");
				return "Password incorrect";
			}

		} else {

			System.out.println("User data not present");
		}
		return "User data not present";
	}

	// Method to upload data onto s3
	public List<String> uploadFile(List<MultipartFile> uploadFiles) {
		System.out.println("uploadFile service layer function called");
		// AmazonS3ClientBuilder s3 = new AmazonS3ClientBuilder();
		List<String> uploadedFilesUrl = new ArrayList<>();
		S3Client s3 = S3Client.builder().region(Region.of(awsRegion))
				.credentialsProvider(
						StaticCredentialsProvider.create(AwsBasicCredentials.create(awsAccessKey, awsSecretKey)))
				.build();
		for (MultipartFile uploadFile : uploadFiles) {
			try {
				PutObjectRequest request = PutObjectRequest.builder()
						.bucket(awsBucket)
						.key(uploadFile.getOriginalFilename())
						.contentType(uploadFile.getContentType())
						.build();
				s3.putObject(request, RequestBody.fromBytes(uploadFile.getBytes()));
				String fileName = uploadFile.getOriginalFilename();
				System.out.println("Uploaded: " + fileName);
				String url = "https://" + awsBucket + ".s3." + awsRegion + ".amazonaws.com/" + fileName;
				uploadedFilesUrl.add(url);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println("This is the url list: " + uploadedFilesUrl);
		return uploadedFilesUrl;
	}
}
