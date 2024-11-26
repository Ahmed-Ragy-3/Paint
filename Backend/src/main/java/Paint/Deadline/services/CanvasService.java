package Paint.Deadline.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class CanvasService {

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
}
