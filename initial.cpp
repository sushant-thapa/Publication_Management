//Computer Graphics
//Fifth semester project on Bohr's Model of Atom
#include <iostream>
#include <string>
#include <cmath>
#include <GL/glut.h>

using namespace std;

static int left = 0;
GLfloat angle = 5.0f;
int refreshmill = 50;
int characterCounter = 0;
string inputCharacter;
int inputNumber = 1;

void timer(int value)
{
    glutPostRedisplay();
    glutTimerFunc(refreshmill, timer, 0);
}

void init(void)
{
    glClearColor(9.0, 9.0, 9.0, 0.0);
    glShadeModel(GL_FLAT);
}

void myKey(unsigned char key, int x, int y)
{

    if (key < 58 && key >= 48 && characterCounter < 2)
    {
        inputCharacter[characterCounter] = key;
        characterCounter++;
    }
    else if (key == 13)
    {
        inputNumber = stoi(inputCharacter);
        inputCharacter = "  ";
        characterCounter = 0;
        if (inputNumber > 20)
        {
            inputNumber = 20;
        }
    }
    else if (key == 27)
    {
        exit(0);
    }
}

void takeInput()
{
    glutKeyboardFunc(myKey);
    glRasterPos2f(10, 25);
}

void displayTopInfo()
{
    unsigned char info[] = "Enter Atomic Number:";
    int w;
    w = glutBitmapLength(GLUT_BITMAP_8_BY_13, info);
    glRasterPos2f(-2.3, 2.0);
    glColor3f(1.0, 0.0, 0.0);
    for (int i = 0; i < 20; i++)
    {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, info[i]);
    }
    for (int i = 0; i < 2; i++)
    {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, inputCharacter[i]);
    }
}

void displayBottomInfo()
{
    unsigned char info[] = "Atomic Number:";
    glRasterPos2f(-0.5, -2.0);
    glColor3f(1.0, 0.0, 0.0);
    for (int i = 0; i < 14; i++)
    {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, info[i]);
    }
    string str = to_string(inputNumber);
    for (int i = 0; i < 2; i++)
    {
        glutBitmapCharacter(GLUT_BITMAP_HELVETICA_18, str[i]);
    }
}

void drawNucleus(float r)
{
    glPushMatrix();
    glRotatef(angle, 1, 1, 1);
    glColor3f(30.0, 0.0, 0.0);
    glutWireSphere(r, 30, 36);
    //glutSolidSphere(2.0, 30, 36);
    glPopMatrix();
}

void drawOrbit(float r)
{
    glBegin(GL_LINE_STRIP);
    glColor3f(0.0, 0.0, 0.0);

    for (int i = 0; i < 1000; i++)
    {
        float theta = 2.0f * 3.1415926f * float(i) / 1000.0;
        float x = r * cosf(theta);
        float y = r * sinf(theta);
        glVertex2f(x, y);
    }
    glEnd();
    //glRotatef(3, 1, 1, 1);
}

void drawElectron(float x, float y)
{
    glPushMatrix();
    glColor3f(0.0, 0.0, 50.0);
    glRotatef(angle, 0, 0, 1);
    glTranslatef(x, y, 0);
    glutSolidSphere(0.1, 100, 100);
    glPopMatrix();
}

void drawOrbitElectron()
{
    int atomicNumber = inputNumber;
    float radiusOfOrbit[4] = {0.7, 1, 1.3, 1.6};
    int numberOfOrbit = ceil((atomicNumber - 2) / 8.0) + 1;
    //printf("%d", numberOfOrbit);
    for (int i = 0; i < numberOfOrbit; i++)
    {
        drawOrbit(radiusOfOrbit[i]);

        if (i == 0)
        {
            if (atomicNumber == 1)
            {
                drawElectron(radiusOfOrbit[0], 0);
            }
            else
            {
                drawElectron(radiusOfOrbit[0], 0);
                drawElectron(-radiusOfOrbit[0], 0);
            }
        }
        else if (i == numberOfOrbit - 1 && (atomicNumber - 2) % 8 != 0)
        {
            for (int j = 0; j < (atomicNumber - 2) % 8; j++)
            {
                drawElectron(radiusOfOrbit[i] * cosf(2.0 * 3.1415926 * j / ((atomicNumber - 2) % 8)), radiusOfOrbit[i] * sinf(2.0 * 3.1415926 * j / ((atomicNumber - 2) % 8)));
            }
        }
        else
        {
            for (int j = 0; j < 8; j++)
            {
                drawElectron(radiusOfOrbit[i] * cosf(2.0 * 3.1415926 * j / 8), radiusOfOrbit[i] * sinf(2.0f * 3.1415926 * j / 8));
            }
        }
    }
}

void display(void)
{
    float radiusOfNucleus = 0.2;
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.0, 0.0, 0.0);
    //glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    drawNucleus(radiusOfNucleus);
    drawOrbitElectron();
    displayTopInfo();
    displayBottomInfo();
    glutSwapBuffers();
    takeInput();

    angle += 02;
}

void reshape(int w, int h)
{
    glMatrixMode(GL_PROJECTION);
    gluPerspective(50.0, w / (GLfloat)h, 3.0, 90.0);
    glMatrixMode(GL_MODELVIEW);
    gluLookAt(0.0, 0.0, 5.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0);
}

int main(int argc, char **argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGB);
    glutInitWindowSize(800, 600);
    glutCreateWindow("Bohr's Model of Atom");
    init();
    glutDisplayFunc(display);
    glutReshapeFunc(reshape);
    glutTimerFunc(0, timer, 0);
    glutMainLoop();
    return 0;
}