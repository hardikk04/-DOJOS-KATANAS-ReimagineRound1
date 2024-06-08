uniform float uTime;
uniform vec2 uFrequency;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
    float elevation = sin(modelPosition.x * uFrequency.x - uTime * 1.5) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y  - uTime * 1.5) * 0.1;
    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition; 
    gl_Position = projectionPosition;
    vUv = uv;
}