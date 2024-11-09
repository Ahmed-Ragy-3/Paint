package Paint.Deadline.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Paint.Deadline.Abstract.Shape;
import Paint.Deadline.repositories.ShapeRepository;
import lombok.Data;

@Service
@Data
public class ShapeService {

    @Autowired
    private final ShapeRepository shapeRepository;

    public Shape saveShape(Shape shape)
    {
        return shapeRepository.save(shape);
    }

    public List<Shape> getAllShapes()
    {
        return shapeRepository.findAll();
    }

    public void deleteShape(Long id)
    {
        shapeRepository.deleteById(id);
    }
}
