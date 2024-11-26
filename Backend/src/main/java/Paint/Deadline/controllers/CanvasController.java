package Paint.Deadline.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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
    public String save(@RequestBody String canvasData) {
        try {
            canvasService.saveCanvas(canvasData);
            return "Canvas Saved Successfully";
        } catch (Exception e) {
            return "Error Saving Canvas" + e.getMessage();
        }
    }    
}
