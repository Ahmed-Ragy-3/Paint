package Paint.Deadline.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.services.ShapeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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

    @PostMapping(path = "/save", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Shape> save(@RequestBody Shape shape) {
        System.out.println("ShapeController received: " + shape);
        try {
            Shape savedShape = shapeService.saveShape(shape);
            return new ResponseEntity<>(savedShape, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/load")
    public List<Shape> getShapes() {

        return shapeService.getAllShapes();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteShape(@PathVariable Long id) {
        shapeService.deleteShape(id);
        return ResponseEntity.noContent().build();
    }

}
