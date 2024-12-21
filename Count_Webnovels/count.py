def countWebsites(dic):
    total = 0
    print("\n\nWebsite List:\n")
    max_key_len = max(len(key) for key in dic)

    sorted_dic = dict(sorted(dic.items(), key=lambda x: x[1], reverse=True))
    for key, value in sorted_dic.items():
        print(f'{key.ljust(max_key_len)} : {value}')
        total += value
    print(f"Total Webnovels = {total}")

with open("/mnt/c/Users/rites/OneDrive/Desktop/New folder/novelz.txt", "r") as file:
    websites = {}
    titles = []
    websitz = []
    for line in file:
        if 'http' not in line:
            continue

        # Novel Website
        start = line.find("https://")
        if start != -1:
            start += len("https://")
        else:
            start = line.find("http://") + len("http://")
        
        if 'www.' in line[start:]:
            start += len('www.')
        elif 'm.' in line[start:]:
            start += len('m.')
        
        end = line.find('/', start)
        website = line[start:end]

        if website in websites:
            websites[website] += 1
        else:
            websites[website] = 1
        
        # Novel names
        if 'novel' in line[end:]:
            start1 = line.find('novel', end) + len('novel/')
        elif 'book' in line[end:]:
            start1 = line.find('book', end) + len('book/')
        else:
            continue

        end1 = line.find('/', start1)
        extracted = line[start1:end1] if end != -1 else line[start:]

        end2 = -1
        if '-' in extracted:
            end2 = extracted.rfind('_')
        elif '.htm' in extracted:
            end2 = extracted.rfind('.htm')
        if end2 == -1:
            end2 = len(extracted)
        book = extracted[:end2]

        if '-' in book:
            title = book.replace('-', ' ').title()
            titles.append(title)
            websitz.append(website)
                      
    count = 0
    max_title_length = max(len(title) for title in titles)
    for n in range(len(titles)):
        print(titles[n].ljust(max_title_length) + '  : ' + websitz[n])
        count += 1
    print("Total".ljust(max_title_length) + '  : ' + str(count))
    countWebsites(websites)