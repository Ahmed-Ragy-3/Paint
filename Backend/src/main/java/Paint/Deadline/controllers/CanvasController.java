package Paint.Deadline.controllers;

import java.io.IOException;

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

    @PostMapping("/saveJSON")
    public String save(@RequestBody String canvasData) {
        return canvasData;
    }

    @PostMapping("/saveXML")
    public String saveXML(@RequestBody String canvasData) throws IOException
    {
        String xml = canvasService.saveAsXML(canvasData);
        return xml;
    }
    @PostMapping("/loadJSON")
    public String Load(@RequestBody String canvasData)
    {
        return canvasData;
    }
    @PostMapping("/loadXML")
    public String LoadXML(@RequestBody String canvasData) throws IOException
    {
        String json = canvasService.XMLtoJSON(canvasData);
        return json;
    }
}
