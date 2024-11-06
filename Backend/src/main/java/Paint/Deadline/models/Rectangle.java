package Paint.Deadline.models;


import Paint.Deadline.Abstract.Shape;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Rectangle extends Shape {

    public double length;
    public double width;

    @Override
    public double area() {
        return Double.valueOf(length*width);
    }

}
