import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";

export const About = () => {
  const wordCloudRef = useRef(null);
  const skillItemsRef = useRef([]);
  const mousePositionRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef(null);
  const [isSetup, setIsSetup] = useState(false);

  // Setup skills and their initial positions
  useEffect(() => {
    if (wordCloudRef.current && !isSetup) {
      const container = wordCloudRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Clear any existing skill items
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      skillItemsRef.current = skills.map((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        
        // Calculate size based on skill value (proficiency)
        const size = Math.max(40, Math.min(90, skill.value * 0.8));
        
        // Create logo element
        const logo = document.createElement('img');
        logo.src = skill.logo;
        logo.alt = skill.name;
        logo.className = 'skill-logo';
        logo.width = size;
        logo.height = size;
        
        // Add name beneath logo
        const name = document.createElement('div');
        name.className = 'skill-name';
        name.textContent = skill.name;
        
        // Random initial position
        const left = Math.random() * (containerWidth - size);
        const top = Math.random() * (containerHeight - size);
        
        skillItem.style.left = `${left}px`;
        skillItem.style.top = `${top}px`;
        
        // Add elements to the DOM
        skillItem.appendChild(logo);
        skillItem.appendChild(name);
        container.appendChild(skillItem);
        
        // Return item with physics properties
        return {
          element: skillItem,
          size,
          position: { x: left, y: top },
          velocity: { 
            x: (Math.random() - 0.5) * 1, 
            y: (Math.random() - 0.5) * 1 
          },
          mass: size / 40, // Larger items have more mass
        };
      });
      
      setIsSetup(true);
    }
  }, [isSetup]);

  // Animation and interaction logic
  useEffect(() => {
    if (!isSetup) return;
    
    const container = wordCloudRef.current;
    
    // Track mouse position
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: -1000, y: -1000 };
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Animation function
    const animateItems = () => {
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const mouseRepelRadius = 100; // Radius within which mouse repels items
      const mouseRepelStrength = 0.5; // Strength of mouse repulsion
      const friction = 0.98; // Friction to slow down movement
      const borderBounceFactor = 0.8; // How much items bounce off borders
      
      skillItemsRef.current.forEach(item => {
        // Calculate distance from mouse
        const dx = mousePositionRef.current.x - (item.position.x + item.size / 2);
        const dy = mousePositionRef.current.y - (item.position.y + item.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply repulsion if mouse is close
        if (distance < mouseRepelRadius) {
          const repelForce = mouseRepelStrength * (1 - distance / mouseRepelRadius);
          item.velocity.x -= (dx / distance) * repelForce / item.mass;
          item.velocity.y -= (dy / distance) * repelForce / item.mass;
        }
        
        // Apply velocity
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        
        // Apply friction
        item.velocity.x *= friction;
        item.velocity.y *= friction;
        
        // Bounce off borders
        if (item.position.x <= 0 || item.position.x >= containerWidth - item.size) {
          item.velocity.x *= -borderBounceFactor;
          item.position.x = Math.max(0, Math.min(containerWidth - item.size, item.position.x));
        }
        
        if (item.position.y <= 0 || item.position.y >= containerHeight - item.size * 1.5) {
          item.velocity.y *= -borderBounceFactor;
          item.position.y = Math.max(0, Math.min(containerHeight - item.size * 1.5, item.position.y));
        }
        
        // Apply new position
        item.element.style.left = `${item.position.x}px`;
        item.element.style.top = `${item.position.y}px`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animateItems);
    };
    
    // Start animation
    animateItems();
    
    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isSetup]);

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
        <Row className=" sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Work Timline</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{data.jobtitle}</th>
                      <td>{data.where}</td>
                      <td>{data.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="5">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="7">
            <div ref={wordCloudRef} className="skills-word-cloud">
              {/* Skills will be dynamically placed here */}
            </div>
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lang="5">
            <h3 className="color_sec py-4">services</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => {
              return (
                <div className="service_ py-4" key={i}>
                  <h5 className="service__title">{data.title}</h5>
                  <p className="service_desc">{data.description}</p>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
