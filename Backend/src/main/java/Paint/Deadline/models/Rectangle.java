package Paint.Deadline.models;


import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Rectangle extends Shape {

    private double length;
    private double width;

    @Override
    public double area() {
        return Double.valueOf(length*width);
    }

}
