package Paint.Deadline.Abstract;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import Paint.Deadline.models.Ellipse;
import Paint.Deadline.models.Free;
import Paint.Deadline.models.Line;
import Paint.Deadline.models.Polygon;
import Paint.Deadline.models.Rectangle;
import Paint.Deadline.models.Triangle;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Rectangle.class, name = "Rectangle"),
    @JsonSubTypes.Type(value = Ellipse.class, name = "Ellipse"),
    @JsonSubTypes.Type(value = Triangle.class, name = "Triangle"),
    @JsonSubTypes.Type(value = Line.class, name = "Line"),
    @JsonSubTypes.Type(value = Free.class, name = "Free"),
    @JsonSubTypes.Type(value = Polygon.class, name = "Polygon"),
})

public abstract class Shape {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected long id;

    protected String stroke;

    protected int strokeWidth;

    protected boolean draggable;

    protected int opacity;

    public Shape(String color, int strokeWidth, boolean draggable, int opacity) {
        this.stroke = color;
        this.strokeWidth = strokeWidth;
        this.draggable = draggable;
        this.opacity = opacity;
    }
}
