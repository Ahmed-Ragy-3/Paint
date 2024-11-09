package Paint.Deadline.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import Paint.Deadline.Abstract.Shape;

@Service
public class CanvasService {

    @Autowired
    private ShapeService shapeService;

    public void saveCanvas(String canvasData) throws IOException {
        saveAsJson(canvasData);
        saveAsXML(canvasData);
    }

    private void saveAsJson(String canvasData) throws IOException {
        Path jsonPath = Path.of("canvas_data.json");
        Files.write(jsonPath, canvasData.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

    private void saveAsXML(String canvasData) throws IOException {
        String xmlData = jsonToXml(canvasData);
        Path xmlPath = Path.of("canvas_data.xml");
        Files.write(xmlPath, xmlData.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

    private String jsonToXml(String json) throws IOException {
        Object jsonObject = new ObjectMapper().readValue(json, Object.class);
        return new XmlMapper().writeValueAsString(jsonObject);
    }

    public void readFromJson() throws IOException {

        shapeService.reset();

        Path jsonPath = Path.of("canvas_data.json");

        if (!Files.exists(jsonPath)) {
            System.out.println("Not found");
            return;
        }

        ObjectMapper jsonMapper = new ObjectMapper();
        String jsonContent = Files.readString(jsonPath);

        // Use static inner class for deserialization
        ShapeWrapper shapeWrapper = jsonMapper.readValue(jsonContent, ShapeWrapper.class);

        if (shapeWrapper != null && shapeWrapper.shapes != null) {
            for (Shape shape : shapeWrapper.shapes) {
                shapeService.saveShape(shape);
            }
        }
    }

    // Define ShapeWrapper as a static inner class
    public static class ShapeWrapper {
        public List<Shape> shapes;
    }
}
