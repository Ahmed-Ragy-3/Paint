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

    public void saveAsJson(String canvasData) throws IOException {
        Path jsonPath = Path.of("canvas_data.json");
        Files.write(jsonPath, canvasData.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    }

    public String saveAsXML(String canvasData) throws IOException {
        String xmlData = jsonToXml(canvasData);
        return xmlData;
    }

    public String jsonToXml(String json) throws IOException {
        Object jsonObject = new ObjectMapper().readValue(json, Object.class);
        return new XmlMapper().writeValueAsString(jsonObject);
    }
}
