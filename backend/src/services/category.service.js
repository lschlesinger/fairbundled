import Category from "../models/category.model";

const CATEGORIES = [
    {
        name: "Textilien",
        root: true,
        subcategories: [
            {name: "T-Shirts"},
            {name: "Feuerwehruniformen"},
            {name: "Polizeiuniformen"},
            {name: "Tischwäsche"},
            {name: "Teppiche"},
            {name: "Westen"},
            {name: "Medizinische Kleidung"},
            {name: "Textilbeutel"},
            {name: "Handschuhe"},
            {name: "Hemden"},
            {name: "Schutz- und Sicherheitsbekleidung"},
            {name: "Gardinen"},
            {name: "Trockentücher"}]
    },
    {
        name: "Bauhof",
        root: true,
        subcategories: [
            {name: "Anbaugeräte"},
            {name: "Lagercontainer & Raummodule"},
            {name: "Gartenprodukte"},
            {name: "Befestigungstechnik"},
            {name: "Werkzeug"},
            {name: "Werktstattbedarf"},
            {name: "Werkstatteinrichtung"},
            {name: "Transportgeräte & Anhänger"},
            {name: "Bauchemie"},
            {name: "Baumaterial"},
            {name: "Arbeitsschutz"},
            {name: "Streumittel"},
        ]
    },
    {
        name: "Bürobedarf",
        root: true,
        subcategories: [
            {name: "Ordnen & Archivieren"},
            {name: "Papier"},
            {name: "Flipcharts & Tafel"},
            {name: "Formulare"},
            {name: "Schreibgerät"},
            {name: "Schreibtischaccessoires"},
            {name: "Bürotechnik"},
            {name: "Packmittel"},
            {name: "Wahlmaterial"},
            {name: "Kalender"},
        ]
    },
    {
        name: "Straße und Verkehr",
        root: true,
        subcategories: [
            {name: "Verkehrsspiegel"},
            {name: "Absicherung & Signaltechnik"},
            {name: "Geschwindigkeitsanzeigen"},
            {name: "Schrankenanlagen"},
            {name: "Winterdienst"},
            {name: "Flottenmanagement"},
            {name: "Hinweis-, Warn- & Unfallsverhütungsschilder"},
            {name: "Verkehrsschilder"},
        ]
    },
    {
        name: "Stadtmobiliar",
        root: true,
        subcategories: [
            {name: "Heizungen"},
            {name: "Spielplatzgeräte"},
            {name: "Outdoor Fitnessgeräte"},
            {name: "Parkbänke"},
            {name: "Abfallbehälter"},
            {name: "Müllsysteme"},
            {name: "Geländer"},
            {name: "Fahrradständer"},
            {name: "Buswartehaus"},
            {name: "Schwimmbadtechnik & Ausstattung"},
        ]
    }
];


class CategoryService {

    static async createCategories() {
        await Category.remove({});
        // get copy of all categories
        const categories = [...CATEGORIES];

        // iterate over categories
        for (const i in categories) {
            const category = categories[i];
            const subs = [];
            if (category.subcategories) {
                for (const j in category.subcategories) {
                    const sub = category.subcategories[j];
                    const subc = await Category.findOneAndUpdate(sub, sub, {upsert: true, new: true});
                    subs.push(subc);
                }
            }
            category.subcategories = subs;
            let c = await Category.findOneAndUpdate(category, category, {upsert: true});
            console.log(c);
        }
    }

}

export default CategoryService;
