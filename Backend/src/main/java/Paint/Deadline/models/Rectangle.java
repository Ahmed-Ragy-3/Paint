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
    public int area() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'area'");
    }

}
