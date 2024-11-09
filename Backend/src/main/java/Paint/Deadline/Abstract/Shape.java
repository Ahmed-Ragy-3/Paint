package Paint.Deadline.Abstract;

import lombok.Data;

@Data
public abstract class Shape {
    protected int centerX;

    protected int centerY;

    protected String color;

    protected String type;

    protected int strokeWidth;
    
    public abstract double area();
  
}
