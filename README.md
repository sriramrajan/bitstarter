#!/usr/bin/python
#@author Sriram Rajan
#@Problem Merchant's Guide to Galaxy
from collections import namedtuple
import sys

class Symbols:
    def __init__(self):
        self.symblRec = namedtuple('symblRec', 'name value repeats subtracts')
        self.symDict = {}
        self.nameDict = {}
        self.symDict['I'] = self.symblRec(None, 1,    3, None)
        self.symDict['V'] = self.symblRec(None, 5,    0, 'I')
        self.symDict['X'] = self.symblRec(None, 10,   3, 'I')
        self.symDict['L'] = self.symblRec(None, 50,   0, 'X')
        self.symDict['C'] = self.symblRec(None, 100,  3, 'X')
        self.symDict['D'] = self.symblRec(None, 500,  0, 'C')
        self.symDict['M'] = self.symblRec(None, 1000, 3, 'C')
        
    def subs(self, stringInput, symbolInst):
        
        if self.symDict.has_key(symbolInst):
            self.symDict[symbolInst] = self.symDict[symbolInst]._replace(name=stringInput)

            self.nameDict[stringInput] = symbolInst
        else:
            print "Foriegn key : ", symbolInst
            return None

    def translateNames(self, inputList):
        symbolList=[]
        for symName in inputList:
            if (self.nameDict.has_key(symName)):
                symbolList.append(self.nameDict[symName])
            else:
                print "I have no idea what you mean"
        return self.evaluateSymbols(symbolList)

    def evaluateSymbols(self, symList):
        total = 0
        prevSym = None
        repeatSym = 0
        for sym in symList:
            if (prevSym == sym):
                repeatSym += 1
            else: # Reset repeated symbol on first mis-match
                repeatSym = 0

            if (repeatSym > self.symDict[sym].repeats):
                print "Repetition not allowed"
                return None

            if (prevSym is not None) and \
               (self.symDict[prevSym].value < self.symDict[sym].value):

                if (self.symDict[sym].subtracts == prevSym):
                    # Compensate for adding this value 
                    # in previous iteration
                    total += (self.symDict[sym].value -\
                              (2 * self.symDict[prevSym].value))
                else:
                    print "Cannot subtract ", sym ," from ", prevSym
                    return None
            else:
                total += self.symDict[sym].value
            
            prevSym = sym
        return total

class Parser:
    def __init__(self):
        self.repeatSymbolCount = {}
        self.commodities = {}
        self.units = []

    def lexical_parser(self, inputList, symbolInstance):
        
        for inputString in inputList:
            mylist = []
            if inputString is not None:
                mylist = inputString.strip().split(' is ')
            else:
                continue
            if len(mylist) == 1:
                print "I have no idea what you are talking about"
            
            if (mylist[0].count(' ') == 0):
                symbolInstance.subs(mylist[0], mylist[1])
            elif (mylist[0].lower() == 'how much'):
                hmList =    mylist[1].split(' ')[:-1] # Remove '?'
                print mylist[1][:-1].strip('\ *$') + " is " + str(symbolInstance.translateNames(hmList))
            elif (mylist[0].split()[0] in symbolInstance.nameDict.keys()):
                commodity = mylist[0].split()[-1]
                units = mylist[1].split()[1] #extract last
                try:
                    value = int(mylist[1].split()[0])
                except ValueError:
                    print "Invalid value encountered in : ", mylist[1].split()[0]
                    
                unitvalue = value/symbolInstance.translateNames(\
                                                        mylist[0].split(' ')[:-1])

                self.commodities[commodity] = [unitvalue, units]
                self.units.append(units)
            elif (mylist[0][:-1].lower() == 'how many') and \
                   (mylist[0].split()[-1] in self.units.keys()):
                       unit = mylist[0].split()[-1][0]
                       commodity =mylist[1].split()[:-1][-1][0] 
                       # if (commodity in self.commodities.keys()):
                       #     print mylist[1].split()[:-1], " is ", str(symbolInstance.translateNames(mylist[1].split()[:-1][:-1] * self.commodities[commodity][0]), unit
                       # else:
                       #    print "I have no idea what you are talking about"




if __name__ == "__main__":
   # Hard-coding known values

   Test = Symbols()

   myParse = Parser()
   
   fin = sys.stdin.readlines()
   myParse.lexical_parser(fin, Test)
