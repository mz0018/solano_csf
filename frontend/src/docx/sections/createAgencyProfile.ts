import { Paragraph, TextRun, AlignmentType } from "docx";

export const createAgencyProfile = () => {

    return [
        new Paragraph({
            alignment: AlignmentType.LEFT,
    
            children: [
                new TextRun({
                    text: "I.         ",
                    bold: true,
                }),
                new TextRun({
                    text: "Agency Profile",
                    bold: true,
                }),
            ],
        }),

        new Paragraph({
            indent: { left: 600 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "A.   History of the Municipality of Solano",
                    break: 1,
                }),
            ]
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 960 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "The first Spanish Missionary headed by a Dominican priest in the name of ",
                }),

                new TextRun({
                    text: "Father Alejandro Vidal",
                    bold: true,
                }),

                new TextRun({
                    text: ", founded the municipality of ",
                }),

                new TextRun({
                    text: "Solano",
                    bold: true,
                }),

                new TextRun({
                    text: " in 1767 which was then called “",
                }),

                new TextRun({
                    text: "Lungabang",
                    bold: true,
                }),

                new TextRun({
                    text: "” meaning cave in the Gaddang dialect. The name was later changed to “",
                }),

                new TextRun({
                    text: "Lumabang",
                    bold: true,
                }),

                new TextRun({
                    text: "” by the Spaniards for convenience.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            indent: { left: 960 },
            spacing: { after: 300 },
            children: [
                new TextRun({
                    text: "In 1851, by Executive Order, Governor General Antonio Urbiztondo declared Lumabang as a barrio of Bayombong for not having sufficient inhabitants and revenue to maintain itself. Only in 1860 when ",
                }),

                new TextRun({
                    text: "Governor General Ramon Solano Y Llanderal",
                    bold: true,
                }),

                new TextRun({
                    text: " authorized the separation of Lumabang as barrio of Bayombong, and later, its name was changed to Solano on April 25, 1863 to honor the Governor General.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,

            indent: {
                left: 960,
            },

            spacing: {
                after: 300,
            },

            children: [
                new TextRun({
                text: "The people’s lasting remembrance of the unparalleled wisdom of the late Father Juan Villaverde, who undertook the almost perfect planning of the town, is entangled with its history. The poblacion, as designed, consists of fourteen (14) wide streets, each having a width of twenty (20) meters arranged in parallel running from north to south and east to west forming a total number of 100 square blocks having an aggregate area of more or less one hectare per block.",
                }),
            ],
        }),

        new Paragraph({
            alignment: AlignmentType.JUSTIFIED,

            indent: {
                left: 960,
            },

            spacing: {
                after: 300,
            },

            children: [
                new TextRun({
                    text: "The Spanish government in Solano ended in September 14, 1898 when it laid down its arms to the revolutionary forces. A brief Revolutionary Government was put up on September 17, 1898 under the command of Major Delfin Esquivel, which gave way to an election of local revolutionary officials. Solano then was under the American Government. The Commander of the American Troops in Nueva Vizcaya ordered the local revolutionary officials after taking oath of allegiance to the US, to continue their tenure of office until the military rule lasted in 1901. This was followed by a Civil Government until the establishment of the Commonwealth in 1940. Since then, regular election was conducted.",
                }),
            ],
        }),
    ]
}