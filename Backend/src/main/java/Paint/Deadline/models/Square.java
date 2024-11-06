package Paint.Deadline.models;

import Paint.Deadline.Abstract.Shape;

import lombok.EqualsAndHashCode;
import lombok.Data;

@Data
@EqualsAndHashCode(callSuper = false)
public class Square extends Shape {

    public double side;
    @Override
    public double area() {
        return Math.pow(side, 2);
    }

}
