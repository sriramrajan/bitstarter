bitstarter
==========

# Program to code up Greedy solution

from sys import argv

class Greedy:

    def __init__(self, Dict):
        self.DictDiff = {}
        self.DictRatio = {}
        self.Schedule(Dict)
        # print self.DictRatio
        self.DescDiff = self.DictDiff.keys()
        self.DescDiff.sort(reverse=True)
        self.DescRatio = self.DictRatio.keys()
        self.DescRatio.sort(reverse=True)
        print self.DictDiff
        print self.DictRatio
        self.Compute()

    def Compute(self):
        # Diff first
        print self.DescDiff
        print self.DescRatio

        # Conputing DIFF
        DiffSum = 0
        DiffLength = 0
        for value in self.DescDiff:
            weights = self.DictDiff[value]
            if (len(weights) > 1):
                weights.sort(reverse=True)
            print "Value: ", value
            for weight in weights:
                # print "\tLength = ", DiffLength, " + ", weight, " - ", value, "\n"
                DiffLength += (weight - value)
                print "\tDiffSum = ", DiffSum," + (", weight," x ", DiffLength, ")"
                DiffSum += (weight * DiffLength)

        print "DIFF result: ", DiffSum,"\n"

        # for Ratio
        RatioLength = 0
        RatioSum = 0
        weights = []
        for value in self.DescRatio:
            weights = self.DictRatio[value]

            if (len(weights) > 1):
                weights.sort(reverse=True)
            print "Value: ", value
            for weight in weights:
                RatioLength += int(weight/value)
                print "\tRatioSum = ", RatioSum," + (", weight," x ", RatioLength, ")"
                RatioSum += (weight * RatioLength)

        print "RATIO result: ", RatioSum,"\n"

    def Schedule(self, Dict):
        for entry in Dict.keys():
            weight = Dict[entry][0]
            length = Dict[entry][1]
            Diffvalue = weight - length
            Ratiovalue = float(weight) / float(length)

            # print "Weight: ",weight,", Length: ", length,",DiffValue: ",Diffvalue
            if not self.DictRatio.has_key(Ratiovalue):
                self.DictRatio[Ratiovalue] = []
                self.DictRatio[Ratiovalue].append(weight)
            elif weight > self.DictRatio[Ratiovalue][0]:
                self.DictRatio[Ratiovalue].insert(0,weight)
            else:
                self.DictRatio[Ratiovalue].append(weight)

            if not self.DictDiff.has_key(Diffvalue):
                self.DictDiff[Diffvalue] = []
                self.DictDiff[Diffvalue].append(weight)
            elif weight > self.DictDiff[Diffvalue][0]:
                self.DictDiff[Diffvalue].insert(0,weight)
            else:
                self.DictDiff[Diffvalue].append(weight)





if __name__ == "__main__":
    InputGraph = open(argv[-1])
    MasterDict = {}

    Count = int(InputGraph.readline())

    for Input in InputGraph.readlines():
        Count -= 1
        weight, length = Input.split()
        temp = []
        temp.append(int(weight))
        temp.append(int(length))
        MasterDict[Count] = temp



    Test = Greedy(MasterDict)
