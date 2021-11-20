package edu.escuelaing.arsw.boardUI.security;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

@EnableWebSecurity
public class ApplicationSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    private BoardUIAuthenticationProvider authProvider;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
    throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
        .anyRequest().authenticated()
        .and().formLogin().loginPage("/welcome").permitAll().defaultSuccessUrl("/home", true);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
        .antMatchers("/static/**", "/templates/public/**");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
