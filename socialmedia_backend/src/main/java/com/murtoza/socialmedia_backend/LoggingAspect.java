package com.murtoza.socialmedia_backend;

import com.murtoza.socialmedia_backend.security.TokenProvider;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Before("execution(* com.murtoza.socialmedia_backend.controller.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("Before "+ joinPoint.getSignature().getName());
    }
    @AfterReturning(
            pointcut = "execution(* com.murtoza.socialmedia_backend.controller.*.*(..))",
            returning= "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        logger.info("AfterReturning "+ joinPoint.getSignature().getName());
        logger.info("Method returned value is : "+ result);
    }


}
