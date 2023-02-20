
# Generátor motivačních citací

Webová aplikace vytvořená s JavaScriptovým frameworkem NextJS. 

Stránka s inputem do kterého uživatel zadá nějakou požadovanou informaci o něm a pomocí OpenAI API - Doplněním textu a genrováním obrázků se vytvoří motivační citace.


## Startovaní projektu

Protože ve školní síti se z nějakého důvodu zakazuje volat na OpenAI API, tak aplikace je hostována na server Vercelu:

[Demo verze aplikace](https://api-cviceni-skola.vercel.app/)

,jinak



pro spuštění projektu v developerském módu je potřeba spustit příkaz:

```bash
  npm run dev
```


## Environment Variables

Pokud chcete, aby vám tento projekt běžel je potřeba zadat několik proměných pro správnou funkčnost. Vytvořte soubor s názvem ***.env.local*** a do něho zadejte:

`NEXT_PUBLIC_SUPABASE_URL=`

`NEXT_PUBLIC_SUPABASE_ANON_KEY=`

