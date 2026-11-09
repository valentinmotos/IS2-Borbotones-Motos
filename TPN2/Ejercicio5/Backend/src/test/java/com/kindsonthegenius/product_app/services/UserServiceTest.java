package com.kindsonthegenius.product_app.services;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.kindsonthegenius.product_app.model.User;
import com.kindsonthegenius.product_app.repositories.UserRepository;

class UserServiceTest {

    @Test
    void registrationAllowsLoginWithTheOriginalPassword() {
        UserRepository userRepository = mock(UserRepository.class);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        UserService userService = new UserService(userRepository, passwordEncoder);
        User registration = new User();
        registration.setUsername("alice");
        registration.setPassword("secret");

        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        User savedUser = userService.addUser(registration);
        when(userRepository.findByUsername("alice")).thenReturn(savedUser);

        assertTrue(userService.authenticate("alice", "secret"));
        assertFalse(userService.authenticate("alice", "incorrect"));
        assertFalse(userService.authenticate("unknown", "secret"));
    }
}
