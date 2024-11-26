package Paint.Deadline.controllers;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Paint.Deadline.services.CanvasService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/canvas")
@CrossOrigin(origins = "*")
public class CanvasController {

    @Autowired
    private CanvasService canvasService;

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody String canvasData) {
        try {
            // Save canvas data as both JSON and XML (will handle proper serialization in the service)
            canvasService.saveCanvas(canvasData);

            // Return success message after saving files
            return ResponseEntity.ok("Canvas data saved as JSON and XML files.");
        } catch (IOException e) {
            // Handle any IO exceptions (e.g., file writing errors)
            return ResponseEntity.status(500).body("Failed to save canvas data: " + e.getMessage());
        } catch (Exception e) {
            // Handle any other general exceptions
            return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/download")
    public ResponseEntity<FileSystemResource> downloadCanvas() {
        try {
            // Define the JSON and XML files
            File jsonFile = new File("canvas_data.json");
            File xmlFile = new File("canvas_data.xml");

            // Check if both files exist
            if (!jsonFile.exists() || !xmlFile.exists()) {
                return ResponseEntity.status(404).body(null); // Not found
            }

            // Assume you want to send both files as a response. Here, let's send the JSON file as an example
            FileSystemResource fileSystemResource = new FileSystemResource(jsonFile);

            // Set up the headers to indicate a file download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + jsonFile.getName());

            // Return the response with the JSON file
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(fileSystemResource);
        } catch (Exception e) {
            // Handle errors in file retrieval or other issues
            return ResponseEntity.status(500).body(null);
        }
    }
}
