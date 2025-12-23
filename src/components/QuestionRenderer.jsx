import React, { useRef, useEffect, useState } from 'react';
import CitySearch from './CitySearch';
import InfoIcon from './InfoIcon';
import BottomSheet from './BottomSheet';

const RadioInput = ({ options, value, onChange }) => {
  // Handle both simple string values and object values with otherText
  const selectedValue = typeof value === 'object' && value !== null ? value.selected : value;
  const otherText = typeof value === 'object' && value !== null ? value.otherText : '';

  const hasOtherOption = options.some(opt => opt.value === 'other');
  const isOtherSelected = selectedValue === 'other';

  const handleOptionChange = (optionValue) => {
    if (optionValue === 'other') {
      onChange({ selected: 'other', otherText: otherText || '' });
    } else {
      onChange(optionValue);
    }
  };

  const handleOtherTextChange = (text) => {
    onChange({ selected: 'other', otherText: text });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleOptionChange(option.value)}
              className={`
                flex flex-col items-start px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200
                border-2
                ${isSelected
                  ? 'bg-orange-600/20 border-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'bg-zinc-800/50 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:border-gray-500'}
              `}
            >
              <span className="font-bold text-base">{option.label}</span>
              {option.description && (
                <span className="text-xs text-zinc-400 mt-1 block font-normal leading-relaxed">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Show text input when "Other" is selected */}
      {hasOtherOption && isOtherSelected && (
        <div className="mt-3 animate-slide-up">
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleOtherTextChange(e.target.value)}
            placeholder="Please specify..."
            className="w-full bg-black border-2 border-orange-500/50 rounded-lg p-3 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

const CheckboxInput = ({ options = [], groups = [], value = [], onChange, allowCustomInput, uiType }) => {
  const [expandedGroups, setExpandedGroups] = useState({});

  // Handle both array of strings and object with selected array + otherText
  const selectedValues = Array.isArray(value) ? value : (value?.selected || []);
  const otherText = typeof value === 'object' && !Array.isArray(value) ? value.otherText : '';

  // Determine if we should show custom input (either explicit flag or 'other' option exists)
  // If using groups, we check if any group has 'other' OR if allowCustomInput is true
  const hasCustomInput = allowCustomInput || options.some(opt => opt.value === 'other') ||
    groups.some(g => g.options.some(opt => opt.value === 'other'));

  const isCustomInputActive = selectedValues.includes('heading_custom_input') || (hasCustomInput && selectedValues.includes('other')) || (allowCustomInput && otherText.length > 0);

  const toggleGroup = (groupName) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const getGroupSelectedCount = (group) => {
    return group.options.filter(opt => selectedValues.includes(opt.value)).length;
  };

  const handleChange = (optionValue) => {
    let newSelected;
    if (selectedValues.includes(optionValue)) {
      newSelected = selectedValues.filter((v) => v !== optionValue);
    } else {
      newSelected = [...selectedValues, optionValue];
    }

    // If "other" is in the new selection, return object format
    if (newSelected.includes('other') || (allowCustomInput && otherText)) {
      onChange({ selected: newSelected, otherText: otherText || '' });
    } else {
      onChange(newSelected);
    }
  };

  const handleCustomTextChange = (text) => {
    onChange({ selected: selectedValues, otherText: text });
  };

  // Helper to render a single option button
  const renderOptionBtn = (option) => {
    const isSelected = selectedValues.includes(option.value);
    return (
      <button
        key={option.value}
        onClick={() => handleChange(option.value)}
        className={`
          flex flex-col items-start px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200
          border-2 relative overflow-hidden w-full
          ${isSelected
            ? 'bg-orange-500/20 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]'
            : 'bg-zinc-800/50 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:border-gray-500'}
        `}
      >
        <div className="flex justify-between items-center w-full">
          <span className="font-bold text-base">{option.label || option.value}</span>
          {isSelected && (
            <span className="text-orange-400 text-[10px] font-black bg-orange-950/50 px-2 py-0.5 rounded-full ml-2 shrink-0 uppercase tracking-tighter">
              Selected
            </span>
          )}
        </div>
        {option.description && (
          <span className="text-xs text-zinc-400 mt-1 block font-normal leading-relaxed">
            {option.description}
          </span>
        )}
      </button>
    );
  };

  const isAccordion = uiType === 'accordion_group' && groups.length > 0;

  return (
    <div className="space-y-6">
      {isAccordion ? (
        /* Accordion Style Groups */
        <div className="space-y-4">
          {groups.map((group, idx) => {
            const count = getGroupSelectedCount(group);
            const isExpanded = expandedGroups[group.group_name];
            return (
              <div
                key={idx}
                className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${isExpanded ? 'border-orange-500/40 bg-orange-500/5' : 'border-zinc-800 hover:border-zinc-700'}`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleGroup(group.group_name)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-white tracking-tight">{group.group_name}</span>
                    {count > 0 && (
                      <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {count} Selected
                      </span>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Content */}
                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1500px] opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.options.map((opt) => renderOptionBtn(opt))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : groups.length > 0 ? (
        /* Original Group Style */
        <div className="space-y-8">
          {groups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              {group.group_name && (
                <h4 className="text-orange-400/80 text-sm font-bold uppercase tracking-widest border-b border-orange-500/20 pb-1 mb-3">
                  {group.group_name}
                </h4>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.options.map((opt) => renderOptionBtn(opt))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Flat List Style */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => renderOptionBtn(option))}
        </div>
      )}

      {/* Custom Input / "Other" Field */}
      {hasCustomInput && (
        <div className="mt-4 pt-4 border-t border-zinc-800 animate-fade-in">
          <label className="block text-sm text-zinc-400 mb-2">
            {allowCustomInput ? "Any other roots or vibes?" : "Other:"}
          </label>
          <input
            type="text"
            value={otherText}
            onChange={(e) => handleCustomTextChange(e.target.value)}
            placeholder="Type here..."
            className="w-full bg-black border-2 border-orange-400/30 rounded-lg p-3 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

const TextInput = ({ type = "text", placeholder, value = "", onChange, isHero }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`
      w-full bg-black border-2 rounded-lg outline-none transition-all duration-300
      placeholder:text-zinc-600 text-white
      ${isHero
        ? 'p-6 text-2xl border-orange-500/50 focus:border-orange-500 focus:shadow-[0_0_30px_rgba(249,115,22,0.2)] text-center'
        : 'p-4 border-zinc-700 focus:border-cyan-400 focus:bg-zinc-900'}
    `}
  />
);

const TextAreaInput = ({ placeholder, value = "", onChange }) => {
  const ref = useRef(null);

  // Auto-resize when value changes
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  const handleInput = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    onChange(el.value);
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
      rows={4}
      className="
        w-full bg-black border-2 border-zinc-700 rounded-lg p-4 
        text-white placeholder:text-zinc-600 outline-none 
        focus:border-cyan-400 focus:bg-zinc-900 transition-all duration-300
        resize-vertical min-h-[120px]
      "
      style={{ overflow: 'hidden' }}
    />
  );
};

const HeroCard = ({ question, value, onChange }) => (
  <div className="flex flex-col items-center justify-center py-12 space-y-8 animate-fade-in">
    <div className="text-center space-y-4 max-w-xl">
      <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-4">
        <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-200 to-orange-400 pb-2">
        {question.text}
      </h3>
      {question.helpText && (
        <p className="text-xl text-zinc-400 font-light">{question.helpText}</p>
      )}
    </div>
    <div className="w-full max-w-md">
      <TextInput
        isHero
        value={value}
        onChange={onChange}
        placeholder="Type character name..."
      />
    </div>
  </div>
);

const HeroStart = ({ question, onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
    <div className="w-32 h-32 md:w-48 md:h-48 mb-6 relative">
      {/* Fallback to text if image fails or is SVG */}
      <img
        src={question.image}
        alt="Logo"
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        style={{ boxSizing: 'content-box', borderRadius: '72px' }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>

    <div className="space-y-2">
      <h2 className="text-sm md:text-base tracking-[0.5em] text-orange-400 font-bold uppercase">
        {question.subtitle}
      </h2>
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-lg">
        {question.title}
      </h1>
    </div>

    <p className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed">
      {question.text}
    </p>

    <button
      onClick={onNext}
      className="
        mt-8 px-12 py-4 bg-transparent border-2 border-orange-500 text-orange-400 
        text-xl font-bold tracking-widest uppercase rounded-none
        hover:bg-orange-500 hover:text-white transition-all duration-300
        shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]
      "
    >
      {question.buttonText}
    </button>
  </div>
);

const MultiEntryInput = ({ question, value = [], onChange, maxEntries = 5 }) => {
  const entries = Array.isArray(value) ? value : (value ? [value] : []);

  const handleEntryChange = (index, newValue) => {
    const newEntries = [...entries];
    newEntries[index] = newValue;
    onChange(newEntries.filter(e => e.trim() !== '')); // Remove empty entries
  };

  const handleAddEntry = () => {
    if (entries.length < maxEntries) {
      onChange([...entries, '']);
    }
  };

  const handleRemoveEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);
  };

  // Always show at least one input field
  const displayEntries = entries.length > 0 ? entries : [''];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 animate-fade-in">
      <div className="text-center space-y-4 max-w-xl">
        <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-4">
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-orange-200 to-orange-400 pb-2">
          {question.text}
        </h3>
        {question.helpText && (
          <p className="text-xl text-zinc-400 font-light">{question.helpText}</p>
        )}
      </div>

      <div className="w-full max-w-md space-y-3">
        {displayEntries.map((entry, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={entry}
              onChange={(e) => handleEntryChange(index, e.target.value)}
              placeholder={`Character ${index + 1}...`}
              className="flex-1 bg-black border-2 border-orange-500/50 rounded-lg p-4 text-lg text-white placeholder:text-zinc-600 outline-none focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300"
            />
            {entries.length > 1 && (
              <button
                onClick={() => handleRemoveEntry(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all"
                title="Remove"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}

        {entries.length < maxEntries && (
          <button
            onClick={handleAddEntry}
            className="w-full py-3 border-2 border-dashed border-orange-500/30 rounded-lg text-orange-400 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another ({entries.length}/{maxEntries})
          </button>
        )}
      </div>
    </div>
  );
};

export const QuestionRenderer = ({ question, value, onChange, onLocationSelect, setGlobalAnswer, onNext }) => {
  const containerRef = useRef(null);
  const [infoModal, setInfoModal] = useState({ isOpen: false, title: '', content: '' });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [question.id]);

  const openInfo = () => {
    if (question.info) {
      setInfoModal({
        isOpen: true,
        title: question.info.title,
        content: question.info.content
      });
    }
  };

  const renderQuestion = () => {
    // Hide manual inputs that are handled by CitySearch
    if (question.id === 'latitude' || question.id === 'longitude' || question.id === 'country') return null;

    if (question.type === 'hero_start') {
      return <HeroStart question={question} onNext={onNext} />;
    }

    if (question.uiType === 'hero_card') {
      // Assuming HeroCard component is defined elsewhere
      return <HeroCard question={question} value={value} onChange={onChange} />;
    }

    // Handle multi-entry input (for character_match)
    if (question.uiType === 'multi_entry') {
      // Assuming MultiEntryInput component is defined elsewhere
      return <MultiEntryInput question={question} value={value} onChange={onChange} maxEntries={question.maxEntries || 5} />;
    }

    switch (question.type) {
      case 'text':
      case 'email': // Added email type to be handled by TextInput
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <TextInput
              type={question.type}
              value={value || ''}
              onChange={onChange}
              placeholder={question.placeholder}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <TextAreaInput
              value={value || ''}
              onChange={onChange}
              placeholder={question.placeholder}
            />
          </div>
        );

      case 'radio':
        // Assuming RadioInput component is defined elsewhere
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <RadioInput options={question.options} value={value} onChange={onChange} />
          </div>
        );

      case 'checkbox':
        // Assuming CheckboxInput component is defined elsewhere
        return (
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <CheckboxInput
              options={question.options || []}
              groups={question.options_groups || []}
              value={value || []}
              onChange={onChange}
              maxSelections={question.max_selections}
              allowCustomInput={question.allow_custom_input}
              uiType={question.uiType}
            />
          </div>
        );

      case 'date':
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <input
              type="date"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl p-6 text-2xl text-white focus:border-orange-500 outline-none transition-all [color-scheme:dark]"
            />
          </div>
        );

      case 'time':
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            <div className="flex flex-col gap-6">
              <input
                type="time"
                value={value?.time || ''}
                onChange={(e) => onChange({ ...value, time: e.target.value })}
                className="w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl p-6 text-2xl text-white focus:border-orange-500 outline-none transition-all [color-scheme:dark]"
              />
              <div className="flex gap-4">
                {['exact', 'approximate', 'none'].map((acc) => (
                  <button
                    key={acc}
                    onClick={() => onChange({ ...value, accuracy: acc })}
                    className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all border-2 capitalize
                      ${value?.accuracy === acc
                        ? 'bg-orange-500/20 border-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.1)]'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                  >
                    {acc === 'none' ? 'I legend tell me' : acc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'number':
        return (
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">{question.text}</h2>
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            {question.helpText && <p className="text-zinc-400 mb-8 font-light text-lg">{question.helpText}</p>}
            <input
              type="number"
              step="any"
              placeholder={question.placeholder}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl p-6 text-2xl text-white focus:border-orange-500 outline-none transition-all"
            />
          </div>
        );

      case 'city':
        // Assuming CitySearch component is defined elsewhere
        return (
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              {question.info && <InfoIcon onClick={openInfo} />}
            </div>
            <CitySearch onLocationSelect={onLocationSelect} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full flex justify-center py-12 px-4 min-h-[50vh] transition-all duration-700">
      {renderQuestion()}

      <BottomSheet
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal(prev => ({ ...prev, isOpen: false }))}
        title={infoModal.title}
      >
        {infoModal.content}
      </BottomSheet>
    </div>
  );
};
