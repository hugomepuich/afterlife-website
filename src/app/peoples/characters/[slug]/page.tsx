// /src/app/peoples/characters/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCharacters, getCharacterBySlug } from '@/lib/data/characters';
import ImageGallery from './ImageGallery';
import CharacterPortrait from './CharacterPortrait';

// Cette fonction est utilisée par Next.js pour générer des pages statiques
// pour tous les personnages connus
export async function generateStaticParams() {
    const characters = getCharacters();
    return characters.map((character) => ({
        slug: character.slug,
    }));
}

export default async function CharacterPage({ params }: { params: { slug: string } }) {
    const param = params;
    const slug = param.slug;

    // Récupérer le personnage par son slug
    const character = getCharacterBySlug(slug);

    if (!character) {
        console.log("Personnage non trouvé pour le slug:", slug);
        notFound();
    }

    console.log("Personnage trouvé:", character.name);

    // Toutes les images disponibles pour le personnage
    const allImages = [
        ...(character.previewImage ? [character.previewImage] : []),
        ...(character.additionalImages || [])
    ];
    
    // Sélectionner une image aléatoire pour le header depuis la galerie
    const getRandomImage = () => {
        // Priorité aux images additionnelles pour le header
        if (character.additionalImages && character.additionalImages.length > 0) {
            const randomIndex = Math.floor(Math.random() * character.additionalImages.length);
            return character.additionalImages[randomIndex];
        }
        return character.previewImage;
    };
    
    const headerImage = getRandomImage();

    // Fonction pour déterminer la couleur et l'icône basées sur le karma
    const getKarmaDetails = (karma: string) => {
        switch(karma) {
            case 'good': 
                return { 
                    bg: 'from-emerald-950 to-teal-950', 
                    border: 'border-emerald-800', 
                    text: 'text-emerald-400',
                    glow: 'shadow-emerald-900/50',
                    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            case 'bad': 
                return { 
                    bg: 'from-red-950 to-rose-950', 
                    border: 'border-red-900', 
                    text: 'text-red-400',
                    glow: 'shadow-red-900/50',
                    icon: 'M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
            default: 
                return { 
                    bg: 'from-zinc-900 to-stone-950', 
                    border: 'border-zinc-800', 
                    text: 'text-zinc-400',
                    glow: 'shadow-zinc-900/50',
                    icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                };
        }
    };

    const karmaDetails = character.karma ? getKarmaDetails(character.karma) : getKarmaDetails('neutral');

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
            {/* Ambient Background Effect - Dark Souls inspired */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {headerImage && (
                    <div className="absolute inset-0">
                        {/* Dark Souls inspired gradient - darker at bottom, lighter at top */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0a0a1a]/90 to-[#0a0a1a]/60 z-10 mix-blend-multiply"></div>
                        <Image 
                            src={headerImage} 
                            alt=""
                            fill
                            className="object-cover object-center filter contrast-125 brightness-75 opacity-30"
                            priority
                        />
                    </div>
                )}
                
                {/* Decorative border elements - Changed from purple to dark blue */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-900/50 to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-blue-900/50 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header Navigation */}
                <header className="border-b border-blue-900/50 bg-black/70 backdrop-blur-md">
                    <div className="container mx-auto px-6 py-4">
                        <Link href="/peoples/characters" className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 group-hover:after:w-full">Retour à la liste des personnages</span>
                        </Link>
                    </div>
                </header>

                {/* Hero Banner */}
                <div className={`relative overflow-hidden border-b border-gray-900 bg-gradient-to-r ${karmaDetails.bg}`}>
                    {/* Decorative Vignette - Enhanced for Dark Souls feel */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none"></div>
                    
                    {/* Character Banner Content */}
                    <div className="container mx-auto px-6 py-12 relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Character Banner Details - Full Width */}
                            <div className="md:col-span-3 flex flex-col justify-center">
                                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider mb-4 text-center">
                                    {character.name} 
                                    {character.surname && (
                                        <span className="text-blue-400 opacity-80 ml-2">{character.surname}</span>
                                    )}
                                </h1>
                                
                                <div className="flex flex-wrap gap-4 justify-center mb-6">
                                    {/* Race Tag */}
                                    <div className="inline-flex items-center px-3 py-1 bg-black/40 backdrop-blur-sm border border-gray-800 text-gray-300 hover:border-blue-700 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-4 h-4 mr-2 text-blue-500" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <span className="font-medium">Race: {character.race}</span>
                                    </div>
                                    
                                    {/* Affiliation Tag */}
                                    {character.affiliation && (
                                        <div className="inline-flex items-center px-3 py-1 bg-black/40 backdrop-blur-sm border border-gray-800 text-gray-300 hover:border-blue-700 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-4 h-4 mr-2 text-blue-500" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                            </svg>
                                            <span className="font-medium">Affiliation: {character.affiliation}</span>
                                        </div>
                                    )}
                                    
                                    {/* Age Tag - Improved styling */}
                                    {character.age && (
                                        <div className="inline-flex items-center px-3 py-1 bg-black/40 backdrop-blur-sm border border-gray-800 text-gray-300 hover:border-blue-700 transition-colors duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-4 h-4 mr-2 text-blue-500" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">Âge: <span className="text-blue-300">{character.age}</span> ans</span>
                                        </div>
                                    )}
                                    
                                    {/* Karma Tag */}
                                    {character.karma && (
                                        <div className={`inline-flex items-center px-3 py-1 bg-black/40 backdrop-blur-sm border ${karmaDetails.border} ${karmaDetails.text} hover:border-opacity-100 transition-colors duration-300`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-4 h-4 mr-2" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                            </svg>
                                            <span className="font-medium">
                                                {character.karma === 'good' ? 'Bon' :
                                                character.karma === 'bad' ? 'Mauvais' : 'Neutre'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Edit Button */}
                                <div className="flex justify-center mt-4">
                                    <Link
                                        href={`/peoples/characters/${slug}/edit`}
                                        className="group inline-flex items-center px-6 py-3 bg-blue-950 hover:bg-blue-900 border border-blue-800 text-blue-200 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-0 bg-blue-800 opacity-30 transition-all duration-300 group-hover:w-full"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        <span className="relative z-10">Modifier ce personnage</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Area */}
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Left Content Column - Description, History, Gallery */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Description Panel - Dark Souls styling */}
                            <div className="group bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-900/70 transition-colors duration-500 shadow-lg shadow-black/20">
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">Description</h2>
                                </div>
                                <div className="p-6 relative overflow-hidden">
                                    {/* Decorative magic effect - Changed from purple to blue */}
                                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-900/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                    
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line relative z-10">{character.description}</p>
                                </div>
                            </div>
                            
                            {/* History Panel */}
                            {character.history && (
                                <div className="group bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-900/70 transition-colors duration-500 shadow-lg shadow-black/20">
                                    <div className="px-6 py-4 border-b border-gray-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <h2 className="text-xl font-bold text-white tracking-wider">Histoire</h2>
                                    </div>
                                    <div className="p-6 relative overflow-hidden">
                                        {/* Decorative magic effect - Changed from purple to blue */}
                                        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-900/10 rounded-full filter blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none"></div>
                                        
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-line relative z-10">{character.history}</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Gallery Panel */}
                            {character.additionalImages && character.additionalImages.length > 0 && (
                                <div className="group bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-900/70 transition-colors duration-500 shadow-lg shadow-black/20">
                                    <div className="px-6 py-4 border-b border-gray-800 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                            className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                        <h2 className="text-xl font-bold text-white tracking-wider">Galerie</h2>
                                    </div>
                                    <div className="p-6">
                                        <ImageGallery
                                            mainImage={character.previewImage}
                                            additionalImages={character.additionalImages}
                                            characterName={character.name}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Right Sidebar Column - Character Details */}
                        <div className="lg:col-span-1 space-y-10">
                            {/* Character Information Card (renamed from Profile) */}
                            <div className="group bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-900/70 transition-colors duration-500 shadow-lg shadow-black/20">
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">Informations</h2>
                                </div>
                                
                                {/* Portrait added to Information section */}
                                <div className="p-6 flex justify-center">
                                    <div className="relative w-64 h-80">
                                        {/* Dark Souls style portrait frame */}
                                        <div className="absolute inset-0 border-2 border-gray-800 bg-black/50 shadow-2xl transform rotate-1 -translate-x-1 translate-y-1"></div>
                                        <div className="absolute inset-0 border-2 border-gray-800 bg-black/50 shadow-2xl transform -rotate-1 translate-x-1 -translate-y-1"></div>
                                        
                                        {/* Main portrait */}
                                        <div className="relative h-full w-full border-2 border-gray-800 shadow-2xl overflow-hidden bg-gradient-to-b from-black via-transparent to-black z-10">
                                            {character.previewImage ? (
                                                <CharacterPortrait 
                                                    previewImage={character.previewImage}
                                                    characterName={character.name}
                                                    karmaDetails={karmaDetails}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                                    <span className="text-gray-600">Aucune image disponible</span>
                                                </div>
                                            )}
                                            
                                            {/* Decorative Corner Elements - Dark Souls style */}
                                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-800"></div>
                                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-800"></div>
                                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-800"></div>
                                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-800"></div>
                                        </div>
                                        
                                        {/* Glow effect appropriate to karma */}
                                        <div className={`absolute inset-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] ${karmaDetails.glow} filter blur-md opacity-30 z-0`}></div>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-800/50">
                                    {/* Race */}
                                    <div className="p-5 hover:bg-blue-900/5 transition-colors duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                    className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                </svg>
                                                <span className="text-sm uppercase tracking-wider text-gray-500">Race</span>
                                            </div>
                                            <Link href={`/races/${character.race.toLowerCase()}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 group-hover:underline">
                                                {character.race}
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Affiliation */}
                                    {character.affiliation && (
                                        <div className="p-5 hover:bg-blue-900/5 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Affiliation</span>
                                                </div>
                                                <Link href={`/peoples/affiliations/${character.affiliation}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 group-hover:underline">
                                                    {character.affiliation}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Age - Enhanced styling */}
                                    {character.age && (
                                        <div className="p-5 hover:bg-blue-900/5 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Âge</span>
                                                </div>
                                                <span className="text-blue-300 font-medium">{character.age} <span className="text-gray-400">ans</span></span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Karma */}
                                    {character.karma && (
                                        <div className="p-5 hover:bg-blue-900/5 transition-colors duration-300">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                        className={`w-5 h-5 mr-3 ${karmaDetails.text}`} strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={karmaDetails.icon} />
                                                    </svg>
                                                    <span className="text-sm uppercase tracking-wider text-gray-500">Karma</span>
                                                </div>
                                                <span className={karmaDetails.text}>
                                                    {character.karma === 'good' ? 'Bon' :
                                                    character.karma === 'bad' ? 'Mauvais' : 'Neutre'}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Relations Card */}
                            <div className="group bg-gradient-to-b from-gray-900/80 to-black/60 backdrop-blur-sm border border-gray-800 hover:border-blue-900/70 transition-colors duration-500 shadow-lg shadow-black/20">
                                <div className="px-6 py-4 border-b border-gray-800 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-3 text-blue-500" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                    </svg>
                                    <h2 className="text-xl font-bold text-white tracking-wider">Relations</h2>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex flex-col items-center py-8 text-center">
                                        <div className="w-16 h-16 rounded-full bg-blue-950/40 border border-blue-900/50 flex items-center justify-center mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                                className="w-8 h-8 text-blue-400" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 italic">
                                            Fonctionnalité à venir - Vous pourrez afficher les relations entre personnages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Edit Button Mobile Only */}
                            <div className="lg:hidden">
                                <Link
                                    href={`/peoples/characters/${slug}/edit`}
                                    className="group flex items-center justify-center w-full px-6 py-3 bg-blue-950 hover:bg-blue-900 border border-blue-800 text-blue-200 transition-all duration-300 relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 w-0 bg-blue-800 opacity-30 transition-all duration-300 group-hover:w-full"></span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                        className="w-5 h-5 mr-2 relative z-10" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className="relative z-10">Modifier ce personnage</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}