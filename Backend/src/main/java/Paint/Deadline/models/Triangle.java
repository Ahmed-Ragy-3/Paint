package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Triangle extends Shape {

    public double side;
    @Override
    public double area() {
        return Double.valueOf(0.5 * side * side);
    }

}
