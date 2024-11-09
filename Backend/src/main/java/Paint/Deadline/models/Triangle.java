package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Triangle extends Shape {

    public double side;
    @Override
    public double area() {
        return Double.valueOf(0.5 * side * side);
    }

}
