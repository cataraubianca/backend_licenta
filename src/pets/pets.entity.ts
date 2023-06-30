import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";
import { 
    Entity,
    Index,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from "typeorm";

export enum States{
    ALABAMA = 'Alabama',
    ALASKA = 'Alaska',
    ARIZONA = 'Arizona',
    ARKANSAS = 'Arkansas',
    CALIFORNIA = 'California',
    COLORADO = 'Colorado',
    CONNECTICUT = 'Connecticut',
    DELAWARE = 'Delaware',
    FLORIDA = 'Florida',
    GEORGIA = 'Georgia',
    HAWAII = 'Hawaii',
    IDAHO = 'Idaho',
    ILLINOIS = 'Illinois',
    INDIANA = 'Indiana',
    IOWA = 'Iowa',
    KANSAS = 'Kansas',
    KENTUCKY = 'Kentucky',
    LOUISIANA = 'Louisiana',
    MAINE = 'Maine',
    MARYLAND = 'Maryland',
    MASSACHUSETTS = 'Massachusets',
    MICHIGAN = 'Michigan',
    MINNESOTA = 'Minnesota',
    MISSISSIPPI = 'Mississippi',
    MISSOURI = 'Missouri',
    MONTANA = 'Montana',
    NEBRASKA = 'Nebraska',
    NEVADA = 'Nevada',
    NEWHAMPSHIRE = 'New Hampshire',
    NEWJERSEY = 'New Jersey',
    NEWMEXICO = 'New Mexico',
    NEWYORK = 'New York',
    NORTHCAROLINA = 'North Carolina',
    NORTHDAKOTA = 'North Dakota',
    OHIO = 'Ohio',
    OKLAHOMA = 'Oklahoma',
    OREGON = 'Oregon',
    PENNSYLVANIA = 'Pennsylvania',
    RHODEISLAND = 'Rhode Island',
    SOUTHCAROLINA = 'South Carolina',
    SOUTHDAKOTA = 'South Dakota',
    TENNESSEE = 'Tennessee',
    TEXAS = 'Texas',
    UTAH = 'Utah',
    VERMONT = 'Vermont',
    VIRGINIA = 'Virginia',
    WASHINGTON = 'Washington',
    WWISCONSIN = 'Wisconsin',
    WYOMING = 'Wyoming'
 }

export enum petCategory{
    CAT = 'cat',
    DOG = 'dog',
    RABBIT = 'rabbit',
    BIRD = 'bird',
    HORSE = 'horse',
    FISH = 'fish'

}
export enum Breed {
    DOMESTIC = 'domestic',
    SIAMESE = 'siamese',
    PERSIAN = 'persian',
    BENGAL = 'bengal',
    MAINE_COON = 'maine coon',
    RAGDOLL = 'ragdoll',
    BRITISH_SHORTHAIR = 'british shorthair',
    SCOTTISH_FOLD = 'scottish fold',
    SIBERIAN = 'siberian',
    ABYSSINIAN = 'abyssinian',
    SPHYNX = 'sphynx',
    DEVON_REX = 'devon rex',
    NORWEGIAN_FOREST = 'norwegian forest',
    AMERICAN_SHORTHAIR = 'american shorthair',
    LABRADOR_RETRIEVER = 'labrador retriever',
    GERMAN_SHEPHERD = 'german shepherd',
    GOLDEN_RETRIEVER = 'golden retriever',
    FRENCH_BULLDOG = 'french bulldog',
    BULLDOG = 'bulldog',
    POODLE = 'poodle',
    BEAGLE = 'beagle',
    ROTTWEILER = 'rottweiler',
    YORKSHIRE_TERRIER = 'yorkshire terrier',
    BOXER = 'boxer',
    DACHSHUND = 'dachshund',
    SIBERIAN_HUSKY = 'siberian husky',
    CHIHUAHUA = 'chihuahua',
    SHIH_TZU = 'shih tzu',
    HOLLAND_LOP = 'holland lop',
    NETHERLAND_DWARF = 'netherland dwarf',
    MINI_REX = 'mini rex',
    LIONHEAD = 'lionhead',
    ENGLISH_LOP = 'english lop',
    DUTCH = 'dutch',
    FLEMISH_GIANT = 'flemish giant',
    REX = 'rex',
    ANGORA = 'angora',
    CALIFORNIAN = 'californian',
    POLISH = 'polish',
    NEW_ZEALAND = 'new zealand',
    HIMALAYAN = 'himalayan',
    DUTCH_LOP = 'dutch lop',
    CANARY = 'canary',
    PARAKEET = 'parakeet',
    COCKATIEL = 'cockatiel',
    LOVEBIRD = 'lovebird',
    AFRICAN_GREY = 'african grey',
    COCKATOO = 'cockatoo',
    MACAW = 'macaw',
    FINCH = 'finch',
    BUDGERIGAR = 'budgerigar',
    CONURE = 'conure',
    PIONUS = 'pionus',
    AMAZON = 'amazon',
    QUAKER_PARROT = 'quaker parrot',
    DOVE = 'dove',
    PIGEON = 'pigeon',
    GOLDFISH = 'goldfish',
    BETTA = 'betta',
    GUPPY = 'guppy',
    ANGELFISH = 'angelfish',
    TETRA = 'tetra',
    DISCUS = 'discus',
    KOI = 'koi',
    CICHLID = 'cichlid',
    SWORDTAIL = 'swordtail',
    MOLLIES = 'mollies',
    PLATY = 'platy',
    DANIO = 'danio',
    BARB = 'barb',
    RASBORA = 'rasbora',
    CLOWN_LOACH = 'clown loach',
    ANDALUSIAN = 'andalusian',
    MORGAN = 'morgan',
    TENNESSEE_WALKING_HORSE = 'tennessee walking horse',
    HANOVERIAN = 'hanoverian',
    WELSH_PONY = 'welsh pony',
    SHETLAND_PONY = 'shetland pony',
    BELGIAN = 'belgian',
    MUSTANG = 'mustang',
    IRISH_DRAUGHT = 'irish draught',

}

@Entity()
export class Pets {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({length:128})
    name:string;

    @Column({length:350})
    description:string;

    @Column({length:128})
    age:string;

    @Column({nullable:true})
    userId: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column({
        nullable: true,
    })
    image: string;

    
    @Column({
        type: 'enum',
        enum: States,
        default: States.ALABAMA,
    })
    state: States;

    @Column({
        type: 'enum',
        enum: petCategory,
        default: petCategory.CAT,
        nullable: false
    })
    petCategory: petCategory;

    @Column({
        type: 'enum',
        enum: Breed,
        default: Breed.DOMESTIC,
        nullable: false
    })
    breed: Breed;
    

}