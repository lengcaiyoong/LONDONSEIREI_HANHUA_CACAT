# set chp-finder/replace filepath
#Open files below while comparing google vs japtexts:
    #dict-reusejp.txt
    #chp-finder.txt & japtexts.txt
    #chp-replce.txt & japtexts_google.txt
    #dict-finder.txt
    #dict-replace.txt

    
    
    
    
    

#(reference) python list.map method
    #[(item1) for i, (item1, item2) in enumerate(pair_jap)]






    #library
import os
from pypinyin import pinyin, lazy_pinyin, Style
import numpy as np
import re
import unicodedata
from collections import Counter


    #clean screen
def cls():
    os.system('cls')





# Decide chp-finder/replace
    #use to replace japenese texts to chinese texts
    #chapter specific
        #dict-finder/replace is for general chapter
filepath_chp_finder = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/chinese debug tools/chp-finder.txt"
filepath_chp_replace = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/chinese debug tools/chp-replace.txt"







# Set file path

filepath_japtexts_google = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts_google.txt"
filepath_japtexts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/japtexts.txt"
filepath_node_orikanji = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_orikanji.txt"
filepath_node_hex = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_hex.txt"
filepath_node_mkanji = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_mkanji.txt"
filepath_node_pinyin = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/raw text and hex/nodejs_output all data/node_pinyin.txt"
filepath_dict_finder = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/chinese debug tools/dict-finder.txt"
filepath_dict_replace = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/chinese debug tools/dict-replace.txt"
filepath_dict_reusejp = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/chinese debug tools/dict-reusejp.txt"









# Open the file in read mode
with open(filepath_japtexts_google, 'r', encoding='utf-8') as file:
    japtexts_google = file.read().split('\n')


with open(filepath_japtexts, 'r', encoding='utf-8') as file:
    japtexts = file.read().split('\n')


with open(filepath_node_orikanji, 'r', encoding='utf-8') as file:
    node_orikanji = file.read().split('\n')


with open(filepath_node_hex, 'r', encoding='utf-8') as file:
    node_hex = file.read().split('\n')


with open(filepath_node_mkanji, 'r', encoding='utf-8') as file:
    node_mkanji = file.read().split('\n')



with open(filepath_node_mkanji, 'r', encoding='utf-8') as file:
    normalize_node_mkanji = file.read().split('\n')




with open(filepath_node_pinyin, 'r', encoding='utf-8') as file:
    node_pinyin = file.read().split('\n')


with open(filepath_dict_finder, 'r', encoding='utf-8') as file:
    dict_finder = file.read().split('\n')


with open(filepath_dict_replace, 'r', encoding='utf-8') as file:
    dict_replace = file.read().split('\n')

with open(filepath_dict_reusejp, 'r', encoding='utf-8') as file:
    dict_reusejp = file.read().split('\n')


with open(filepath_chp_finder, 'r', encoding='utf-8') as file:
    chp_finder = file.read().split('\n')


with open(filepath_chp_replace, 'r', encoding='utf-8') as file:
    chp_replace = file.read().split('\n')



# replace u3000 to python u3000 format
for i, es in enumerate(chp_finder):
    if "\\u3000" in es:
        chp_finder[i] = es.replace("\\u3000","\u3000")


# replace u3000 to python u3000 format
for i, es in enumerate(dict_reusejp):
    if "\\u3000" in es:
        dict_reusejp[i] = es.replace("\\u3000","\u3000")


# replace u3000 to python u3000 format
for i, es in enumerate(chp_replace):
    if "\\u3000" in es:
        chp_replace[i] = es.replace("\\u3000","\u3000")





#Shorten Texts
    #There are 5 ways to shorten texts (A) to (E)
    #it will reset allpair's item4 after each method finished


# Set variable
pair_jap = [list(item) for item in zip(japtexts, japtexts_google)]  #makes japtexts and google into pairs
allpair = [ ["index: " + str(i) + " + 1", item1, item2, len(str(item2)) - len(str(item1))] for i, (item1, item2) in enumerate(pair_jap) ]   #all info about japtexts and google_texts



    # Group freqency
def count_frequency(numbers, length):
        # Use Counter to count the frequency of each number
    frequency = Counter(numbers)
        # Convert the frequency dictionary to a list of tuples
    freq_list = list(frequency.items())
        # Pad the list with zeros until its length is a multiple of length
    while len(freq_list) % length != 0:
        freq_list.append((0, 0))
        # Determine the size of the matrix
    matrix_size = len(freq_list) // length
        # Create an empty matrix of tuples
    matrix = np.empty((matrix_size, length), dtype=object)
        # Fill the matrix with frequency data
    for i, (num, freq) in enumerate(freq_list):
        row = i // length
        col = i % length
        matrix[row, col] = f"{num}:{freq}" if num != 0 else ""
        # Print each row of the matrix
    for row in matrix:
        print(row)


    # Run the function
count_frequency(    [ item4  for i, (item1, item2, item3 , item4) in enumerate(allpair) if item4 > 0 ] , 3)






# Start shorten texts


#(A) convert ＿＿＿＿＿＿＿ to original japtexts
for i, es in enumerate(allpair):
    if es[3] > 0:
        if '＿＿＿＿＿＿＿' in es[1]:
            allpair[i][2] = allpair[i][1]


allpair = [ [item1, item2, item3, len(str(item3)) - len(str(item2))] for i, (item1, item2,item3 , item4) in enumerate(allpair) ]


#(B) Reuse japanese sentence
for i, es in enumerate(allpair):
    if es[3] > 0:
        for j, es2 in enumerate(dict_reusejp):
            if allpair[i][1] == es2:
                #es2 is dict_reusejp[j]
                allpair[i][2] = allpair[i][1]


allpair = [ [item1, item2, item3, len(str(item3)) - len(str(item2))] for i, (item1, item2,item3 , item4) in enumerate(allpair) ]


#(C) Clear special symbol

    #set special_symbols
special_symbol = node_mkanji[224-1:317-1]
special_symbol[4] = ','
    #[ ["index: " + str(i), item1, item2, len(str(item2)) - len(str(item1))] for i, (item1, item2) in enumerate(pair_jap) if len(str(item2)) > len(str(item1))]
    #[ [  item3 ] for i, (item1, item2, item3 , item4) in enumerate(allpair) if    item4 == 1   ]
    #allpair which google > japtexts
        #allpair_exceeds = [ ["index: " + str(i), item1, item2, len(str(item2)) - len(str(item1))] for i, (item1, item2) in enumerate(pair_jap) if len(str(item2)) > len(str(item1))]


    #Delete special_symbol if google > japtexts
for i, es in enumerate(allpair):
    if es[3] > 0:
        for j, es2 in enumerate(special_symbol):
            if es2 in es[2]:
                    #es2 is special_symbol[j]
                allpair[i][2] = allpair[i][2].replace(es2, '')


allpair = [ [item1, item2, item3, len(str(item3)) - len(str(item2))] for i, (item1, item2,item3 , item4) in enumerate(allpair) ]






#(D) Delete using chp-finder/replacement if google > japtexts
for i, es in enumerate(allpair):
    if es[3] > 0:
        for j, es2 in enumerate(chp_finder):
            if es2 in es[1]:
                    #es2 is special_symbol[j]
                allpair[i][2] = chp_replace[j]


allpair = [ [item1, item2, item3, len(str(item3)) - len(str(item2))] for i, (item1, item2,item3 , item4) in enumerate(allpair) ]






#(E) Delete using dict-finder/replacement if google > japtexts
for i, es in enumerate(allpair):
    if es[3] > 0:
        for j, es2 in enumerate(dict_finder):
            if es2 in es[2]:
                    #es2 is special_symbol[j]
                #print(es2)
                #print(es[2])
                #print(allpair[i][2].replace(dict_finder[j], dict_replace[j]))
                allpair[i][2] = allpair[i][2].replace(dict_finder[j], dict_replace[j])


allpair = [ [item1, item2, item3, len(str(item3)) - len(str(item2))] for i, (item1, item2,item3 , item4) in enumerate(allpair) ]









# Check using filter_by_number Fn

def filter_by_number(listname, exceed_length):
        # Filter the list
    filtered_list = [ [item1, item2,item3] for i, (item1, item2, item3, item4) in enumerate(listname) if item4 == exceed_length]
        # Pad the list with None until its length is a multiple of 3
    while len(filtered_list) % 3 != 0:
        filtered_list.append([None,None,None])
        # Convert the list to a numpy array and reshape it into a matrix
    matrix = np.array(filtered_list).reshape(-1, 3)
    return matrix


# Test the function
filter_by_number(allpair, 1)

count_frequency(    [ item4  for i, (item1, item2, item3 , item4) in enumerate(allpair) if item4 > 0 ] , 3)









# !!!COMPARE japnese and google trans texts manually!!! HERE!!!!!!!!!!!!!!!
# DO NOT EDIT text less than 4 letters in japtexts






# Shorten texts manually using filter_by_item2 & filter_by_item3
    #with these files below:
        #dict-reusejp.txt - just paste any phrase dont want to translate here
        #chp-finder.txt & japtexts.txt - jap texts, dont edit!
        #chp-replce.txt & japtexts_google.txt - edit here
        #dict-finder.txt - if found any general texts wanna replace, just put here
        #dict-replace.txt - edited dict-finders
        

def filter_by_item2(listname, exceed_length):
        # Filter the list
    filtered_list = [ item2 for i, (item1, item2, item3, item4) in enumerate(listname) if item4 == exceed_length]
        # Pad the list with None until its length is a multiple of 3
    matrix = np.array(filtered_list).reshape(-1, 1)
    return matrix



def filter_by_item3(listname, exceed_length):
        # Filter the list
    filtered_list = [ item3 for i, (item1, item2, item3, item4) in enumerate(listname) if item4 == exceed_length]
        # Pad the list with None until its length is a multiple of 3
    matrix = np.array(filtered_list).reshape(-1, 1)
    return matrix


# Test the function
filter_by_item2(allpair, 1)


# Test the function
filter_by_item3(allpair, 1)









# DONE COMPARE japnese and google trans texts manually!!!!!!!!!!!!!!!!!








# Make sure item2.length < 1 to 4 not edited (they are not text, but game data)
    # by default i start from length of 1 , if still cannot, increase the length 
    #[ [item1] for i, (item1, item2, item3) in enumerate(pair_jap2) if len(item1) < 4 ]   

for i, es in enumerate(allpair):
    if len(es[1]) <= 1:
        allpair[i][2] = es[1]





# Make both list same length
    # if too short, just add spacing utfsomehing
    # [ '　', '8140', '　' ], which is '\u3000' in python
        #pair_jap2 = [(i+1, item1, item2.ljust(len(item1), '\u3000')) for i, (item1, item2) in enumerate(pair_jap)]
    #format of pair_jap2 is [ ind +1 , item2, item3 ]

pair_jap2 = [(i+1, item2, item3.ljust(len(item2), '\u3000')) for i, (item1, item2, item3, item4) in enumerate(allpair)]



# check if pair_jap2 item2 and item3 is same length, return if any pair with diff length
[(i+1, (item1, item2)) for i, (item1, item2, item3) in enumerate(pair_jap2) if len(str(item2)) != len(str(item3))]








#!! DONE COMPARE TEXT !!
    #file output pair_jap2



















# Set save path for final hex txt

filepath_japtexts_hexs = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/"
name_of_file3 = "japtexts_hexs"
complete_name3 = os.path.join(filepath_japtexts_hexs, name_of_file3 + ".txt")


# clear and create txt
with open(complete_name3, "w", encoding='utf-8') as file1:
    pass



# Define function safe_index, return -1 if cannot find
def safe_index(lst, x):
    try:
        return lst.index(x)
    except ValueError:
        return -1


# Define function qingsheng, return true if it is qingsheng
def check_qingsheng(s):
    pattern = r'^[a-z]+5$'
    if re.match(pattern, s):
        return True
    else:
        return False



# Create error list, to get error
pinyin_error_message = []
pinyin_error_symbol = []

translated_text = []
translated_texts = []








# Get pinyin
    #n2, lve and nve
    #qing sheng (neutral_tone_with_five=True)
    #two 3 sheng (tone_sandhi=True)
    #run pinyin and lazypinyin, lazypinyin return a simple list
        #example:
            #pinyin(pair_jap2[0][2], style=Style.TONE3), this will create list of lists
            #lazy_pinyin(pair_jap2[0][2], style=Style.TONE3, tone_sandhi=True, neutral_tone_with_five=True)
            #((lazy_pinyin('种子', style=Style.TONE3, tone_sandhi=True, neutral_tone_with_five=True))[1])[-1] == '5'


#get modified google translated texts in 1-dimensional list
mjaptexts_google = [(item3) for i, (item1, item2, item3) in enumerate(pair_jap2)]  #list of google_texts

#initialize empty list to store all pinyins
japtexts_pinyins_fulllist = []


# special characters which are in full-width cannot be recognized eg 1-10 / aA-Zz, need to change to half-width by normalize
    #normalize all
        #node_mkanji = [unicodedata.normalize('NFKC', str(element)) for element in node_mkanji]
    
    #normalize only number and alphabet to half-width
    

for i in range(161, 222):  # Remember, Python's range end is exclusive
    normalize_node_mkanji[i] = unicodedata.normalize('NFKC', node_mkanji[i])  






# Get Hexs - using enumerate in a for loop
    #find if qingsheng and special characters , otherwise just get the hex
for i, el in enumerate(mjaptexts_google):
    japtexts_pinyins_list = []
    translated_text = []
    japtexts_pinyins = lazy_pinyin(el, style=Style.TONE3, tone_sandhi=True, neutral_tone_with_five=True)
    if el == pair_jap2[i][1]:
        for ioel, oel in enumerate( list(el) ):
            japtexts_pinyins_list.append(node_hex[safe_index(node_orikanji, oel)])
            translated_text.append(node_mkanji[safe_index(node_orikanji, oel)])
    else:
        for j, el2 in enumerate(japtexts_pinyins):
            if safe_index(node_pinyin, el2) == -1:
                #qingsheng zi5 -> zi1
                if el2[-1] == '5' and check_qingsheng(el2):
                    if safe_index(node_pinyin, (el2[:-1]+"1")) != -1:
                        japtexts_pinyins_list.append(node_hex[safe_index(node_pinyin, (el2[:-1]+"1"))])
                        translated_text.append(node_mkanji[safe_index(node_pinyin, (el2[:-1]+"1"))])
                    else:
                        pinyin_error_message.append(str(i+1) + "-th "+ "mjaptexts_google ," + str(j+1) + " item cannot find pinyin, not qing sheng" )
                        pinyin_error_symbol.append(el2)
                        japtexts_pinyins_list.append("8145")
                        translated_text.append(" ")
                else:
                    #special characters
                    for k, kk in enumerate( list(el2) ):
                        if safe_index(node_mkanji, kk) != -1:
                            japtexts_pinyins_list.append(node_hex[safe_index(node_mkanji,kk)])
                            translated_text.append(node_mkanji[safe_index(node_mkanji,kk)])
                        elif safe_index(normalize_node_mkanji, kk) != -1:
                            japtexts_pinyins_list.append(node_hex[safe_index(normalize_node_mkanji,kk)])
                            translated_text.append(normalize_node_mkanji[safe_index(normalize_node_mkanji,kk)])
                        else:
                            pinyin_error_message.append(str(i+1) + "-th "+ "mjaptexts_google ," + str(j+1) + " item- " + str(k+1) + " not special characters" )
                            pinyin_error_symbol.append(kk)
                            japtexts_pinyins_list.append("8145")
                            translated_text.append(" ")
            else:
                japtexts_pinyins_list.append(node_hex[safe_index(node_pinyin, el2)])
                translated_text.append(node_mkanji[safe_index(node_pinyin, el2)])
    japtexts_pinyins_fulllist.append("".join(japtexts_pinyins_list))
    translated_texts.append("".join(translated_text))
    





# Save all hexs
with open(complete_name3, "w", encoding='utf-8') as file1:
    for i, item in enumerate(japtexts_pinyins_fulllist):
        # If it's not the last item, add a newline after it
        if i != len(japtexts_pinyins_fulllist) - 1:
            file1.write(item + '\n')
        # If it's the last item, don't add a newline
        else:
            file1.write(item)

print(f"File saved at: {complete_name3}")


print(len(pinyin_error_symbol))
# see error message
while len(pinyin_error_symbol) % 2 != 0:
    pinyin_error_symbol.append(None)

np.array(pinyin_error_symbol).reshape(-1, 2)


print(len(pinyin_error_message))

# see error message
while len(pinyin_error_message) % 2 != 0:
    pinyin_error_message.append(None)

np.array(pinyin_error_message).reshape(-1, 2)







# Save translated texts for checking purpose

filepath_translated_texts = "C:/Users/HONG/Desktop/psx translation project (desktop)/Project - londonSR (dsktp)/texts analysis/chinese/translation raw texts/"
name_of_file4 = "translated_texts"
complete_name4 = os.path.join(filepath_translated_texts, name_of_file4 + ".txt")



# clear and create txt
with open(complete_name4, "w", encoding='utf-8') as file1:
    pass




with open(complete_name4, "w", encoding='utf-8') as file1:
    for i, item in enumerate(translated_texts):
        # If it's not the last item, add a newline after it
        if i != len(translated_texts) - 1:
            file1.write(item + '\n')
        # If it's the last item, don't add a newline
        else:
            file1.write(item)

print(f"File saved at: {complete_name4}")





##kindly save all dict to 
    #"C:\Users\HONG\Desktop\psx translation project (desktop)\Project - londonSR (dsktp)\texts analysis\chinese\translation raw texts\history"




