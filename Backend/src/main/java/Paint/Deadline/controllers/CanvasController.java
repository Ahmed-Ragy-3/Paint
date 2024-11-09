package Paint.Deadline.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Paint.Deadline.services.CanvasService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
@RequestMapping("/canvas")
@CrossOrigin(origins = "*")
public class CanvasController {

    @Autowired
    private CanvasService canvasService;

    @PostMapping("/save")
    public String save(@RequestBody String canvasData) {
        try {
            canvasService.saveCanvas(canvasData);
            return "Canvas Saved Successfully";
        } catch (Exception e) {
            return "Error Saving Canvas" + e.getMessage();
        }
    }

    @GetMapping("/load")
    public String getMethodName() {
        try {
            canvasService.readFromJson();
            return "Successfully read";
        } catch (Exception e) {
            return "failed" + e.getMessage();
        }
    }
    
    
}
