export default {
	async fetch(request, env, ctx) {
        const json_header = {headers: {"content-type": "application/json;charset=UTF-8"}}
        const html_header = {headers: {"content-type": "text/html;charset=UTF-8"}}

        /*
        Parse request
        */
        var host = request.headers.get("Host")
        var path = request.url.replace(host, "").replace("https:///", "")
        var lang = request.headers.get("Accept-Language")

        /*
        Determine language
        */
        var html_lang = "en"
        if (typeof lang === 'string' || lang instanceof String)
        {
            if (lang.includes("zh-HK") || lang.includes("zh-TW")) 
            {
                html_lang = "zh-HK"
            }
            else if (lang.includes("zh-CN"))
            {
                html_lang = "zh-CN"
            }
        }

        /*
        Fetch latest JSON
        */
        const university_raw = await fetch("https://raw.githubusercontent.com/xn-university-yc5qu737a/GenshinUniversity/main/University.json", json_header);
        const university = await university_raw.json()

        /*
        Decide URL
        */
        var url = null;
        /* Random */
        if (host == "xn--university-yc5qu737a.com") 
        {
            var university_keys = Object.keys(university);
            var random_key = university_keys[Math.floor(Math.random() *university_keys.length)];
            var url = university[random_key]
        } 
        /* Fixed */
        else 
        {
            const sub_domain = host.replace('.xn--university-yc5qu737a.com', "")
            /* Subdomain registered */
            if (university.hasOwnProperty(sub_domain)) {
                var url = university[sub_domain]
            }
        }

        /*
        Fetch HTML template
        */
        var status_code = 302;
        if (url == null) 
        {
            status_code = 404;
        }
        var template_url = "https://raw.githubusercontent.com/xn-university-yc5qu737a/GenshinUniversity/main/Template/" + html_lang + "-" + String(status_code) + ".html"
        var html_template = await (await fetch(template_url, html_header)).text();

        /*
        Return HTML
        */
        if (status_code == 302) 
        {
            /* URL exist */
            const target_url = url + path
            return new Response(
                html_template.replaceAll("{url}", target_url),
                html_header
            );
        }
        else
        {
            /* URL don't exist */
            return new Response(
                html_template,
                html_header
            );
        }
    }
};