import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    print("Speak Anything :")
    audio = r.listen(source)
    text = r.recognize_google(audio)

    if text == "new":
        print("new main created")
        text2="hi"
        while text2 != "exit":
            re = sr.Recognizer()
            with sr.Microphone() as sourcee:
             audio1 = re.listen(source)
            text2 = re.recognize_google(audio1)
            if text2 == "print variable":
                print("print("")")
            elif text2 =="print text" :
                print('print(" ")')
            elif text2 =="input":
                print('input("")')
            elif text2 =="if else statement":
                print('if  :   else:')
            elif text2=="next":
                print("\n")
            elif text2=="for loop":
                print("for x in  :")
            else:

                print(text2.lower())



    else:
       print("syntax error")
