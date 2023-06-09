package com.example.backend.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class UnauthorizedExceptionTest {
    @Test
    void testUnauthorizedExceptionWithDefaultMessage() {
        UnauthorizedException exception = new UnauthorizedException();
        Assertions.assertEquals("You are not authorized!", exception.getMessage());
    }

    @Test
    void testUnauthorizedExceptionWithCustomMessage() {
        String message = "You are not authorized to access this Pet!";
        UnauthorizedException exception = new UnauthorizedException(message);
        Assertions.assertEquals(message, exception.getMessage());
    }

}