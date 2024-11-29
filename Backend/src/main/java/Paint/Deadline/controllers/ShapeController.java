package Paint.Deadline.controllers;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.services.ShapeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/shapes")
@CrossOrigin(origins = "*")
public class ShapeController {

    @Autowired
    private ShapeService shapeService;

    @GetMapping("/hello")
    public String getMethodName() {
        return "hello";
    }
    @PostMapping(path = "/get-shape" , consumes = "application/json" , produces = "application/json" )
    public ResponseEntity<Shape> get_shape(@RequestBody Map.Entry<String,String> request)
    {
        return shapeService.handle(request);
    }

    @PostMapping(path = "/clone" , consumes = "application/json" , produces =  "application/json")
    public ResponseEntity<Shape> clone(@RequestBody Shape shape)
    {
        return shapeService.clone(shape);
    }
}
