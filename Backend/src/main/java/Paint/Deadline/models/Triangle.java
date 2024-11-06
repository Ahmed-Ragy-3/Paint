package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Triangle extends Shape {

    public double side;
    @Override
    public int area() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'area'");
    }

}
