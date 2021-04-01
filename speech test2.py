import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    print("Speak Anything :")
    audio = r.listen(source)
    text = r.recognize_google(audio)

    if text == "new":
        print("new main created")
        text2="hi"
        while text2!="exit":
            re = sr.Recognizer()
            with sr.Microphone() as sourcee:
             audio1 = re.listen(source)
            text2 = re.recognize_google(audio1)
            print(text2)
    else:
       print("syntax error")
