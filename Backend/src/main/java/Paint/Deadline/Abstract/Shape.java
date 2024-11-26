package Paint.Deadline.Abstract;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import Paint.Deadline.models.Elipse;
import Paint.Deadline.models.FreeDrawing;
import Paint.Deadline.models.Line;
import Paint.Deadline.models.Rectangle;
import Paint.Deadline.models.Square;
import Paint.Deadline.models.Triangle;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
    @JsonSubTypes.Type(value = Elipse.class, name = "Elipse"),
    @JsonSubTypes.Type(value = Triangle.class, name = "Triangle"),
    @JsonSubTypes.Type(value = Line.class, name = "Line"),
    @JsonSubTypes.Type(value = Square.class, name = "Square"),
    @JsonSubTypes.Type(value = FreeDrawing.class, name = "FreeDrawing"),
})
public abstract class Shape {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    protected String color;

    protected int strokeWidth;

    protected boolean draggable;

    public Shape(String color, int strokeWidth, boolean draggable) {
        this.color = color;
        this.strokeWidth = strokeWidth;
        this.draggable = draggable;
    }
}
