uniform sampler2D uDisplacement;
uniform sampler2D uCocaColaTexture;
uniform float uOffset;

varying vec2 vUv;

void main()
{
    vec4 displacementTexture = texture2D(uDisplacement,vUv);
    float displacementForce = displacementTexture.r * uOffset * 0.4;
    vec2 uvDisplaced = vec2(vUv.x, vUv.y - displacementForce);
    vec4 cocaColaTexture = texture2D(uCocaColaTexture,uvDisplaced);


    gl_FragColor = vec4(cocaColaTexture.rbg,1.0 - uOffset);
}