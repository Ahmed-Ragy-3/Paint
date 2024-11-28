package Paint.Deadline.services;

import java.io.IOException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

@Service
public class CanvasService {
    public String saveAsXML(String canvasData) throws IOException {
        String xmlData = jsonToXml(canvasData);
        return xmlData;
    }

    public String jsonToXml(String json) throws IOException {
        Object jsonObject = new ObjectMapper().readValue(json, Object.class);
        return new XmlMapper().writeValueAsString(jsonObject);
    }

    public String XMLtoJSON(String XML) throws IOException
    {
        XmlMapper xmlMapper = new XmlMapper();
        JsonNode jsonNode = xmlMapper.readTree(XML.getBytes());
        
        ObjectMapper jsonMapper = new ObjectMapper();
        return jsonMapper.writeValueAsString(jsonNode);
    }
}
