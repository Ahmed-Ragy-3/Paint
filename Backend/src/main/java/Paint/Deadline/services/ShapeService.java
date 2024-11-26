package Paint.Deadline.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.factories.ShapeFactory;
import Paint.Deadline.prototypes.ShapePrototype;

@Service
public class ShapeService {
    @Autowired
    private ShapeFactory shapeFactory;

    @Autowired
    private ShapePrototype shapePrototype;
    public ResponseEntity<Shape> handle(Map.Entry<String,String> request)
    {
        String shapeType = request.getValue();
        Shape shape = shapeFactory.getInstance(shapeType);
        return new ResponseEntity<>(shape, HttpStatus.CREATED);
    }
    
    public ResponseEntity<Shape> clone(@RequestBody Shape shape)
    {
        Shape clonedShape = shapePrototype.clone(shape);
        return new ResponseEntity<>(clonedShape , HttpStatus.CREATED);
    }
}
