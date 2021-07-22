#include <iostream>
#include <opencv2/opencv.hpp>
#if defined(__APPLE__) || defined(__unix__)
#include <unistd.h>
#include <sys/ioctl.h>
#elif _WIN32
    #not implemented
#endif

using namespace std;
using namespace cv;

void moveCursor(int col, int row)
{
    cout << "\033[" << col << ";" << row << "H";
}

int main(int argc, char **argv, char **envp)
{
    bool isTrueColor = false;
    for (char **env = envp; *env != 0; env++)
    {
        char *thisEnv = *env;
        if(strcmp(thisEnv,"COLORTERM=truecolor") == 0){
            isTrueColor = true;
        }
    }
    if(!isTrueColor){
        cout << "No true color support switch to grayscale mode" << endl;
    } else {
        cout << "True color support found" << endl;
    };
    string symboles[] = { "/", "\\", "|","o","0"};
    // string symboles = { "0", "1"};
    int sizeSymboles = sizeof(symboles)/sizeof(symboles[0]);
    int imgCols = 20;
    int imgRows = 20;
    ostringstream ss;

    VideoCapture cap;
    cap.open(0);
    if(!cap.isOpened())
        return 0;
    for(;;)
    {
        moveCursor(0,0);
        #if defined(__APPLE__) || defined(__unix__)
            struct winsize size;
            ioctl(STDOUT_FILENO, TIOCGWINSZ, &size);
            imgCols = size.ws_col;
            imgRows = size.ws_row;
        #elif _WIN32
            cout << "Error: not implemented";
            return 0;
        #endif
        ss.str("");
        Mat frame;
        cap >> frame;
        if( frame.empty() ) break;
        resize(frame,frame,Size(imgCols,imgRows));
        if(!isTrueColor){
            cv::cvtColor(frame, frame, COLOR_BGR2GRAY);
            for(int i = 0; i < imgRows; i++){
                for(int j = 0; j < imgCols; j++) {
                    byte pixel = frame.at<byte>(i, j);
                    int a = (sizeSymboles - 1) * to_integer<int>(pixel) / 255;
                    int p = 22 * to_integer<int>(pixel) / 255 + 233;
                    ss << "\033[38;5;"<< p << "m" << symboles[a];
                }
            }
        } else {
            for(int i = 0; i < imgRows; i++){
                for(int j = 0; j < imgCols; j++){
                    Vec3b pixel = frame.at<Vec3b>(i, j);
                    byte r{pixel[2]};
                    byte g{pixel[1]};
                    byte b{pixel[0]};
                    int a = (sizeSymboles - 1) * to_integer<int>(r) / 255;
                    ss << "\x1b[38;2;" << to_integer<int>(r) << ";" << to_integer<int>(g) << ";" << to_integer<int>(b) << "m"<< symboles[a] << "\x1b[0m";
                }
            }
        }
        cout << ss.str();
        if( waitKey(10) == 27 ) break;
    }
    cout << "\x1b[0m";
    cap.release();
    return 0;
}
