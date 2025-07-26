package com.example.lifeledger.controller;

import com.example.lifeledger.model.UserInfo;
import com.example.lifeledger.repository.UserInfoRepository;
import com.example.lifeledger.util.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
//import java.nio.file.Path;
//import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // ✅ Allow frontend React app
@RestController
@RequestMapping("/api/users")
public class UserInfoController {

    @Autowired
    private UserInfoRepository repository;

    // ✅ POST: Add user and generate QR
    @PostMapping("/add")
    public UserInfo addUser(@RequestBody UserInfo userInfo) {
        UserInfo savedUser = repository.save(userInfo);

        String qrText = "ID: " + savedUser.getId() +
                "\nName: " + savedUser.getName() +
                "\nBlood Group: " + savedUser.getBloodGroup() +
                "\nAllergies: " + savedUser.getAllergies() +
                "\nEmergency Contact: " + savedUser.getEmergencyContact();

        String folderPath = System.getProperty("user.dir") + "/qrcodes";
        new File(folderPath).mkdirs(); // create folder if not exists

        String filePath = folderPath + "/qr_" + savedUser.getId() + ".png";

        try {
            QRCodeGenerator.generateQRCodeImage(qrText, filePath);
            System.out.println("✅ QR Code generated at: " + filePath);
        } catch (WriterException | IOException e) {
            e.printStackTrace();
        }

        return savedUser;
    }

    // ✅ GET: Fetch all users
    @GetMapping("/all")
    public List<UserInfo> getAllUsers() {
        return repository.findAll();
    }

    // ✅ NEW: Download QR Code by ID
    @GetMapping("/qr/{id}")
    public ResponseEntity<Resource> downloadQRCode(@PathVariable Long id) throws IOException {
        String folderPath = System.getProperty("user.dir") + "/qrcodes";
        String fileName = "qr_" + id + ".png";
        File file = new File(folderPath + "/" + fileName);

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                .contentType(MediaType.IMAGE_PNG)
                .body(resource);
    }
}
