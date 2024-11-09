package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Circle extends Shape{

    private double radius;
    @Override
    public double area() {
        return Double.valueOf(Math.PI * Math.pow(radius, 2));
    }

}
