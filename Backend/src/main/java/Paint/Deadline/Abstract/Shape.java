package Paint.Deadline.Abstract;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import Paint.Deadline.models.Circle;
import Paint.Deadline.models.Rectangle;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
    @JsonSubTypes.Type(value = Circle.class, name = "Circle")
})
public abstract class Shape {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    @Column(name = "center_x")
    protected int centerX;

    @Column(name = "center_y")
    protected int centerY;

    @Column(name = "color")
    protected String color;

    @Column(name = "stroke_width")
    protected int strokeWidth;

    @Column(name = "dtype", insertable = false, updatable = false)
    protected String type;
    
    public abstract double area();
  
}
