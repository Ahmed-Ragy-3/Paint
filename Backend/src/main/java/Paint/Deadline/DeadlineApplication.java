package Paint.Deadline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class DeadlineApplication {
    public static void main(String[] args) {
        SpringApplication.run(DeadlineApplication.class, args);
    }
}
