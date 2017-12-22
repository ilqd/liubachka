package ru.splashcourse.liubachka;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@EnableAutoConfiguration
public class LiubackApplication {

    public static void main(String[] args) {
        StarterApplication.run(LiubackApplication.class, args);
    }

    /**
     * Из джавадока - Implementation is thread-safe. For maximum efficiency, applications should use a single globally-shared instance of
     * the HTTP transport.
     */
    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
}
