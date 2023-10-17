# GenshinUniversity
[中文](Readme.md)

## Usage
> Reminder: The query path will be preserved.  
> When you visit `https://hkust.原神University.com/zh-hant/about/polices`, you will be redirected to `https://hkust.edu.hk/zh-hant/about/polices`.
### I am feeling lucky
Just visit [https://原神University.com/](https://原神University.com/).
### Redirect to certain University
Visit `https://sub-domain.原神University.com/`
* `sub-domain` will be use to match the key in `University.json`.
* Will return 404 if the specified key does not exist.

## Add an University
Add it in `University.json` and submit a pull request.
* The key in `University.json` needs to fulfill the rules in [Naming rules for domain names](https://www.alibabacloud.com/help/en/dws/user-guide/naming-rules-for-domain-names#section-ghs-lpv-12b).
