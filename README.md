bitstarter
=====

Problem 1:
<code>
#!/usr/bin/python
#@author Sriram Rajan
#@Problem Merchant's Guide to Galaxy
from collections import namedtuple
import sys

class Symbols:
    def __init__(self):
        self.symblRec = namedtuple('symblRec', 'name value repeats substracts')
        self.symDict = {}
        self.nameDict = {}
        self.symDict['I'] = self.symblRec(None, 1, 3, None)
        self.symDict['V'] = self.symblRec(None, 5, 0, 'I')
        self.symDict['X'] = self.symblRec(None, 10, 3, 'I')
        self.symDict['L'] = self.symblRec(None, 50, 0, 'X')
        self.symDict['C'] = self.symblRec(None, 100, 3, 'X')
        self.symDict['D'] = self.symblRec(None, 500, 0, 'C')
        self.symDict['M'] = self.symblRec(None, 1000, 3, 'C')
        
    def subs(self, stringInput, symbolInst):
        
        if not self.symDict.has_key(symbolInst):
            print "Foriegn key : ", symbolInst
            return None
        self.symDict[symbolInst] = self.symDict[symbolInst]._replace(name=stringInput)

        self.nameDict[stringInput] = symbolInst


class Parser:
    def __init__(self):
        self.repeatSymbolCount = {}

    def lexical_parser(self, inputList, symbolInstance):
        print "InputString is ", inputList
        for inputString in inputList:
            mylist = []
            if inputString is not None:
                mylist = inputString.split(' is ')

            symbolInstance.subs(mylist[0], mylist[1])

        

if __name__ == "__main__":
   # Hard-coding known values

   Test = Symbols()

   Test.subs("Mozart", 'D')

   myParse = Parser()
   
   fin = sys.stdin.readlines()
   myParse.lexical_parser(fin, Test)
   
   print Test.symDict

</code>
