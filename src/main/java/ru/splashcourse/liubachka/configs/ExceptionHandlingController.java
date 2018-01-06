package ru.splashcourse.liubachka.configs;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.util.WebUtils;

import java.sql.SQLException;

@ControllerAdvice
public class ExceptionHandlingController extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status,
            WebRequest request) {
        if (HttpStatus.INTERNAL_SERVER_ERROR.equals(status)) {
            request.setAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE, ex, WebRequest.SCOPE_REQUEST);
        }
        return new ResponseEntity<Object>(ex.getMessage(), headers, status);
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleDAOException(Exception ex) {
        String message = ex.getMessage();
        if (ex.getCause() instanceof SQLException) {
            message = getSQLMessage((SQLException) ex.getCause());
        } else if (ex.getCause().getCause() instanceof SQLException) {
            message = getSQLMessage((SQLException) ex.getCause().getCause());
        }
        return new ResponseEntity<Object>(message, null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<Object> handleSqlException(SQLException ex) {
        return new ResponseEntity<Object>(getSQLMessage(ex), null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getSQLMessage(SQLException ex) {
        return ex.getMessage();
    }

}
